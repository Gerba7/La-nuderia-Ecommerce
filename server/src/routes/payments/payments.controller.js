const { createPayment, createSubscription } = require("../../services/mercadopago");
const { orderMail } = require("../../services/nodemailer");
const { createPaypalOrder, capturePaypalOrder } = require("../../services/paypal");



// MERCADOPAGO


async function httpCreatePreference(req, res) {
	
	const products = req.body


    let body = {
		items: [
			{
				title: 'La Nuderia', //req.body.description,
				unit_price: Number(products.amount),
				quantity: 1,
				picture_url: 'https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/logo.png?alt=media&token=c7bb1657-e603-4e6c-ba26-c1878ea0fbf6'
			},
		],
		back_urls: {
			"success": "https://lanuderia.com/success",
			"failure": "https://lanuderia.com/failure",
			"pending": "https://lanuderia.com/pending"
		},
		payment_methods: {
			installments: 3,
		},
		auto_return: "approved",
	};

	
	try {

		const payment = await createPayment(body);

		return res.json(payment)
	
	} catch (err) {

		console.log(err)

		return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });

	} 


}


async function httpCreateCoursePreference(req, res) {
	
	const products = req.body


    let body = {
		items: [
			{
				title: 'La Nuderia', //req.body.description,
				unit_price: Number(products.amount),
				quantity: 1,
				picture_url: 'https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/logo.png?alt=media&token=c7bb1657-e603-4e6c-ba26-c1878ea0fbf6'
			},
		],
		back_urls: {
			"success": "https://cursos.lanuderia.com/success",
			"failure": "https://cursos.lanuderia.com/failure",
			"pending": "https://cursos.lanuderia.com/pending"
		},
		payment_methods: {
			installments: 3,
		},
		auto_return: "approved",
	};

	
	try {

		const payment = await createPayment(body);

		return res.json(payment)
	
	} catch (err) {

		console.log(err)

		return res
        .status(500)
        .json({ error: true, msg: "Failed to create payment" });

	} 


}


async function httpGetPaymentFeedback(req, res) {

    res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});

}


async function httpCreateSubscription(req, res) {

	let body = {
		reason: "Suscripción de ejemplo",
		auto_recurring: {
		  frequency: 1,
		  frequency_type: "months",
		  transaction_amount: 10,
		  currency_id: "ARS"
		},
		back_url: "https://google.com.ar",
		payer_email: "test_user_46945293@testuser.com"
	};

	try {

		const subscription = await createSubscription(body);
  
		return res.json(subscription);

	} catch (error) {

		console.log(error);
  
		return res
		.status(500)
		.json({ error: true, msg: "Failed to create subscription" });

	}
	
}


// PAYPAL


async function httpCreatePaypalOrder(req, res) {

	const body = req.body;
	
    const order = {
		intent: 'CAPTURE',
		purchase_units: [
			{
				amount: {
					currency_code: 'USD',
					value: body.dolarTotal,
				},
				description: `Curso/s de La Nuderia`
			}
		],
		application_context: {
			brand_name: 'La Nuderia',
			landing_page: 'LOGIN',
			user_action: 'PAY_NOW',
			return_url: 'https://api.lanuderia.com:5000/v1/payments/paypal/capture-order',
			cancel_url: 'https://cursos.lanuderia.com/failure',
		}
	};


	try {

		const paypalOrder = await createPaypalOrder(order);
		
		return res.json(paypalOrder);

	} catch (error) {

		console.log(error);

		return res.status(500).json({error: true, msg: 'Failed to create order'});

	}

}


async function httpCapturePaypalOrder(req, res) {

	const {token, PayerID} = req.query;
	
	try {

		const paypalCapture = await capturePaypalOrder(token);
		
		return res.redirect('https://cursos.lanuderia.com/success');

	} catch (error) {
		
		console.log(error);

		return res.redirect('https://cursos.lanuderia.com/failure');

	}

}


async function httpSendOrderMail(req, res) {

        
    try{

        const order = req.body;

		let subject = `Pedido N°${order?._id.slice(order?._id.length - 7)} - Tenes un nuevo pedido!!!`
		
		let html = `
			<html>
				<body>
					<h1>Resumen de pedido. </h1>
					<br>
					<ul>
						${order?.products?.map(prod => 
								`<li><b>${prod.quantity}</b> X   <b>${prod.title}</b></li>`
						)	
						}
					</ul>
					<br>
					<h2>Pago: ${
						order?.status === 'paid' ? '<p style="color:green;">Pago</p>'
						: order?.status === 'pending' ? '<p style="color:orange;">Pendiente</p>'
						: '<p style="color:red;">Cancelado</p>'
					}</h2>
					<br>
					<h3>Medio de pago: ${
						order?.paymentMethod === 'mercadopago' ? 'Mercado Pago'
						: order?.paymentMethod === 'transference' ? 'Transferencia bancaria'
						: 'Paypal'
					}</h3>
				</body>
			</html>
		`
		
		try{
			await orderMail(subject, html)
		} catch (err) {
			console.log(err)
		}

        res.status(200).json('Enviado')

    } catch (err) {
		console.log(err)
        res.status(400).json('Error al enviar mail de compra')
    }
    

}



module.exports = {  
    httpCreatePreference,
    httpGetPaymentFeedback,
	httpCreateSubscription,
	httpCreatePaypalOrder,
	httpCapturePaypalOrder,
	httpSendOrderMail,
	httpCreateCoursePreference
};