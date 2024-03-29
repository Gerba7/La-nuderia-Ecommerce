const OrderDatabase = require('../../models/order/order.mongo');
const { confirmationMail, sentMail, confirmationCourseMail } = require('../../services/nodemailer');


async function httpCreateOrder(req, res) {

    
    const order = req.body;
    
    const cookies = req.headers.cookie;

    if (cookies) {                         //to secure the refresh token i pass the id of user as a http only cookie to be read in server only

        const parseCookie = str =>
        str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
                    acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
                    return acc;
                }, {}
        );

        const userIdData = parseCookie(cookies)?.userId;

        if (userIdData) {

            orderDatawithId = {...order, userId: userIdData}
        
            try {
                const newOrder = new OrderDatabase(orderDatawithId)
        
                const savedOrder = await newOrder.save();
                return res.status(201).json(savedOrder);
            } catch (err) {
                console.log(err)
                return res.status(400).json(err);
            }
        
        }

    }

    
    try {
        const newOrder = new OrderDatabase(order)
        
        const savedOrder = await newOrder.save();
        return res.status(201).json(savedOrder);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
    }


}


async function httpUpdateOrder(req, res) {
    
    try {
        const updatedOrder = await OrderDatabase.updateOne({ _id: req.params.id}, {
            $set: { status: req.body.status }
        })
        res.status(200).json(updatedOrder)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }   

};


async function httpUpdateOrderSent(req, res) {
    
    try {
        const updatedOrder = await OrderDatabase.updateOne({ _id: req.params.id}, {
            $set: { sent: true }
        })
        res.status(200).json(updatedOrder)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }   

};


async function httpDeleteOrder(req, res) {

    try {
        await OrderDatabase.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    } catch (err) {
        res.status(400).json(err);
    };

};


async function httpGetOrder(req, res) {

        try {
            const order = await OrderDatabase.find({userId: req.params.userId});
            res.status(200).json(order);
        } catch (err) {
            res.status(400).json(err);
        };

};


async function httpGetAllOrders(req, res) {

    const qNew = req.query.new;
  
    try {

        let orders;

        if (qNew) {
            orders = await OrderDatabase.find()
                .sort({createdAt: -1})
                .limit(5);
        } else {
            orders = await OrderDatabase.find()
                .sort({createdAt: -1});
        }
        

        res.status(200).json(orders)
        
    } catch (err) {
        res.status(400).json(err);
    }
    
};



//TODAY INCOME

async function httpGetTodayIncome(req, res) {
    
    const date = new Date();

    const yesterday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    try {

        const todayIncome = await OrderDatabase.aggregate([         //pipeline
            {   $match: {
                    createdAt: {
                        $gte: yesterday,
                    },          
                    status: { $in: ["paid"] }        
                }, 
            },   
            {
                $group: {                                      // separates documents into groups according to a "group key". The output is one document for each unique group key.
                    _id: null,
                    total: {$sum: "$amount"}
                },
            },
        ]);

        res.status(200).json(todayIncome); 

    } catch (err) {
        res.status(400).json(err);
    };

}



//MONTHLY INCOME

async function httpGetActualIncome(req, res) {
    
    const date = new Date();

    const lastMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    
    try {

        const actualMonthIncome = await OrderDatabase.aggregate([         //pipeline
            {   $match: {
                    createdAt: {
                        $gte: lastMonth,
                    },          
                    status: { $in: ["paid"] }            
                }, 
            },   
            {
                $project: {                                    // takes a document that can specify the inclusion of fields, the suppression of the _id field, the addition of new fields, and the resetting of the values of existing fields.
                    month: {$month: "$createdAt"},
                    sales: "$amount"                    
                },
            },
            {
                $group: {                                      // separates documents into groups according to a "group key". The output is one document for each unique group key.
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            },
        ]);

        res.status(200).json(actualMonthIncome); 

    } catch (err) {
        res.status(400).json(err);
    };

}



async function httpGetOrdersStats(req, res) {
    
    const date = new Date();

    const lastMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);

    const beforePreviousMonth = new Date(date.getFullYear(), date.getMonth() - 2, 1);
    
    try {

        const lastMonthIncome = await OrderDatabase.aggregate([         //pipeline
            {   $match: {
                    createdAt: {
                        $gte: previousMonth,                  // $gte(greater or equal to) => previous month, $match filters to continue pipeline
                        $lt: lastMonth,
                    },          
                            
                }, 
            },   
            {
                $project: {                                    // takes a document that can specify the inclusion of fields, the suppression of the _id field, the addition of new fields, and the resetting of the values of existing fields.
                    month: {$month: "$createdAt"},
                    sales: "$amount"                    
                },
            },
            {
                $group: {                                      // separates documents into groups according to a "group key". The output is one document for each unique group key.
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            },
        ]);


        const previosuMonthIncome = await OrderDatabase.aggregate([         //pipeline
            {   $match: {
                    createdAt: {
                        $gte: beforePreviousMonth,                  // $gte(greater or equal to) => previous month, $match filters to continue pipeline
                        $lt: previousMonth,
                    },          
                    status: { $in: ["paid"] } 
                            
                }, 
            },   
            {
                $project: {                                    // takes a document that can specify the inclusion of fields, the suppression of the _id field, the addition of new fields, and the resetting of the values of existing fields.
                    month: {$month: "$createdAt"},
                    sales: "$amount"                    
                },
            },
            {
                $group: {                                      // separates documents into groups according to a "group key". The output is one document for each unique group key.
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            },
        ]);


        res.status(200).json({lastMonthIncome, previosuMonthIncome}); 

    } catch (err) {
        res.status(400).json(err);
    };

}

//SEMESTRAL INCOME

async function httpGetOrdersSemestral(req, res) {
    
    const date = new Date();

    const lastMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    const previousSixMonth = new Date(date.getFullYear(), date.getMonth() - 6, 1);

    try {

        const semesterIncome = await OrderDatabase.aggregate([         //pipeline
            {   $match: {
                    createdAt: {
                        $gte: previousSixMonth,                  // $gte(greater or equal to) => previous month, $match filters to continue pipeline
                        //$lt: lastMonth,
                    },       
                    status: { $in: ["paid"] }    
                            
                }, 
            },   
            {
                $project: {                                    // takes a document that can specify the inclusion of fields, the suppression of the _id field, the addition of new fields, and the resetting of the values of existing fields.
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                    years: {$year: "$createdAt"},                    
                },
            },
            {
                $group: {                                      // separates documents into groups according to a "group key". The output is one document for each unique group key.
                    _id: {month: "$month", year: "$years"},
                    total: {$sum: "$sales"},
                },
            },
            {
                $sort: {
                    _id: 1,
                }
            }
        ]);

        res.status(200).json(semesterIncome); 

    } catch (err) {
        res.status(400).json(err);
    };

}


// CASH ORDERS


async function httpGetCashOrders(req, res) {
    
    const date = new Date();

    const lastMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    
    try {

        const cashIncome = await OrderDatabase.aggregate([         //pipeline
            {   $match: {
                    createdAt: {
                        $gte: lastMonth, 
                    },
                    paymentMethod: "transference",
                    status: { $in: ["paid"] }           
                            
                }, 
            },   
            {
                $project: {                                    // takes a document that can specify the inclusion of fields, the suppression of the _id field, the addition of new fields, and the resetting of the values of existing fields.
                    month: {$month: "$createdAt"},
                    sales: "$amount"                    
                },
            },
            {
                $group: {                                      // separates documents into groups according to a "group key". The output is one document for each unique group key.
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            },
        ]);

        res.status(200).json(cashIncome); 

    } catch (err) {
        res.status(400).json(err);
    };

}


async function httpGetOnlineOrders(req, res) {
    
    const date = new Date();

    const lastMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    
    try {

        const onlineIncome = await OrderDatabase.aggregate([         //pipeline
            {   $match: {
                    createdAt: {
                        $gte: lastMonth, 
                    },
                    paymentMethod: "mercadopago",
                    status: { $in: ["paid"] } 
                }, 
            },   
            {
                $project: {                                    // takes a document that can specify the inclusion of fields, the suppression of the _id field, the addition of new fields, and the resetting of the values of existing fields.
                    month: {$month: "$createdAt"},
                    sales: "$amount"                    
                },
            },
            {
                $group: {                                      // separates documents into groups according to a "group key". The output is one document for each unique group key.
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            },
        ]);

        res.status(200).json(onlineIncome); 

    } catch (err) {
        res.status(400).json(err);
    };

}


async function httpSendConfirmationMail(req, res) {

        
    try{
        
        const order = req.body.id;

        const email = req.body.email;
		
		let subject = `Tu orden de la nudería fue confirmada! Pedido N°${order?.slice(order?.length - 7)}`
		
		//let htmlContent = `
		//	<html>
		//		<body>
		//			<h1>Tu compra ya esta confirmada!</h1>
		//			<br>
		//			<p>
        //                Al ser un trabajo 100% artesanal, la demora en producción
        //                es de 15 a 20 dias hábiles.
		//			<p>
        //            <p>
        //                Gracias por elegir La Nudería! 
		//			<p>
		//		</body>
		//	</html>
		//`
		
		try{
			await confirmationMail(subject, email)   //, htmlContent
		} catch (err) {
			console.log(err)
		}

        res.status(200).json('Enviado')

    } catch (err) {
        res.status(400).json('Error al enviar mail de compra')
    }
    

}




async function httpSentOrderMail(req, res) {

        
    try{
        
        const email = req.body.email;

        const filePath = req.body.filePath;

        const trackingId = req.body.tracking;
		
		let subject = `Tu pedido esta en camino!`
		
		
		
		try{
			await sentMail(subject, trackingId, email, filePath)
		} catch (err) {
			console.log(err)
		}

        res.status(200).json('Enviado')

    } catch (err) {
        res.status(400).json('Error al enviar mail de envio')
    }
    

}




async function httpSendConfirmationCourseMail(req, res) {

        
    try{
        
        const order = req.body.id;

        const email = req.body.email;
console.log(email)
        const filePathArray = req.body.paths;
        console.log(filePathArray)	
		let subject = `Tu curso de la nudería fue confirmado! Pedido N°${order?.slice(order?.length - 7)}`
		
		//let htmlContent = `
		//	<html>
		//		<body>
		//			<h1>Tu compra ya esta confirmada!</h1>
		//			<br>
		//			<p>
        //                Al ser un trabajo 100% artesanal, la demora en producción
        //                es de 15 a 20 dias hábiles.
		//			<p>
        //            <p>
        //                Gracias por elegir La Nudería! 
		//			<p>
		//		</body>
		//	</html>
		//`
		
		try{
			await confirmationCourseMail(subject, email, filePathArray)   //, htmlContent
		} catch (err) {
			console.log(err)
		}

        res.status(200).json('Enviado')

    } catch (err) {
        res.status(400).json('Error al enviar mail de compra')
    }
    

}





module.exports = {
    httpCreateOrder,
    httpUpdateOrder,
    httpDeleteOrder,
    httpGetOrder,
    httpGetAllOrders,
    httpGetOrdersStats,
    httpGetOrdersSemestral,
    httpGetCashOrders,
    httpGetOnlineOrders,
    httpGetActualIncome,
    httpGetTodayIncome,
    httpSendConfirmationMail,
    httpSentOrderMail,
    httpUpdateOrderSent,
    httpSendConfirmationCourseMail
};
