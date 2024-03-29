const UserDatabase = require('../../models/users/users.mongo');


async function htttpUpdateUser(req, res) {
    
        if(req.body.password) {
            const saltRounds = 10; 
            const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = passwordHash;
        };

        try {
            const updatedUser = await UserDatabase.findByIdAndUpdate(req.userId, {
                $set: req.body
            }, {new: true})
            res.status(200).json(updatedUser)
        } catch (err) {
            console.log(err);
            res.status(400).json('Error al actualizar usuario');
        }

   
};

async function htttpUpdateUserCourseAccess(req, res) {
    
    {/*if(req.body.password) {
        const saltRounds = 10; 
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = passwordHash;
    };*/}
    
    try {
        const updatedUser = await UserDatabase.updateOne({ _id: req.params.id}, {
            $set: { courseAccess: req.body.courseAccess }
        })
        res.status(200).json(updatedUser)
    } catch (err) {
        console.log(err);
        res.status(400).json('Error al actualizar usuario');
    }


};


async function htttpDeleteUser(req, res) {

    try {
        await UserDatabase.findByIdAndDelete(req.params.id);
        res.status(200).json("Usuario eliminado con exito!");
    } catch (err) {
        res.status(400).json('Error al eliminar usuario');
    };

};


async function htttpGetUser(req, res) {

    try {
        const user = await UserDatabase.findById(req.params.id);
        const { passwordHash, ...userData } = user._doc;
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json('Error al cargar los usuarios');
    };

};


async function htttpGetAllUsers(req, res) {

    try {
        const users = await UserDatabase.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json('Error al cargar los usuarios');
    };

};


// GET USERS STATS

async function htttpUsersStats(req, res) {

    const currentMonth = new Date().getMonth() + 1;

    try {
        const usersQuantity = await UserDatabase.countDocuments();
        const newUsers = await UserDatabase.countDocuments({
            $expr: { $eq: [{ $month: "$createdAt"}, currentMonth ]}
        });
        res.status(200).json({usersQuantity, newUsers});
    } catch (err) {
        res.status(400).json(err);
    };

};


async function httpPurchaseCourse(req, res) {

    try {
        
        const { courseIds, date, userId } = req.body;
        
        const user = await UserDatabase.findById(userId);

        if (!user) {
            return res.status(404).json({message: 'User not found!'})
        };

        courseIds.forEach((id) => {

            const purchase = {
                course: id,
                purchaseDate: new Date(date)
            };
    
            user.purchases.push(purchase);

        })

        await user.save();

        res.status(200).json({message: 'Course purchased'});

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }

}


async function httpGetPurchasedCourses(req, res) {

    try {
        const cookies = req.headers.cookie;
        
        if(cookies) {

            const parseCookie = str =>
                str
                .split(';')
                .map(v => v.split('='))
                .reduce((acc, v) => {
                            acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
                            return acc;
                        }, {}
            );

            const userId = parseCookie(cookies)?.userId;
            
            
            const user = await UserDatabase.findById(userId).populate('purchases.course');
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const purchasedCourses = user.purchases.map((purchase) => purchase.course);
            
            res.json({ purchasedCourses });

        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }

}




module.exports = {
    htttpUpdateUser,
    htttpDeleteUser,
    htttpGetUser,
    htttpGetAllUsers,
    htttpUsersStats,
    htttpUpdateUserCourseAccess,
    httpPurchaseCourse,
    httpGetPurchasedCourses
};