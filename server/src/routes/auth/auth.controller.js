const UserDatabase = require('../../models/users/users.mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const asyncHandler = require('express-async-handler');
const nodemailer = require("nodemailer");


const createAccessToken = (id, admin) => {
    return jwt.sign(
        {id, admin}, 
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: '20m'}
    );
}

const createRefreshToken = (id, admin) => {
    return jwt.sign(
        {id, admin}, 
        process.env.REFRESH_TOKEN_SECRET, 
        {expiresIn: '180m'}
    );
}


async function httpSignUp(req, res) {

    const user = req.body;
    

    if (!user.email || !user.password || !user.name || !user.lastname) {
        return res.status(400).json({error: 'Debes completar todos los campos'});
    };
    
    if (!validator.isEmail(user.email)) {
        return res.status(400).json({error:'El email no es valido'});
    };
    
    /*const userFound = UserDatabase.find(user.email);

    if (userFound) return res.status(400).json('El email ya esta en uso');

    const usernameFound = UserDatabase.find({username: user.username});

    if (usernameFound) return res.status(400).json('El nombre de usuario ya esta en uso');*/

    const saltRounds = 10; 
    const passwordHash = await bcrypt.hash(user.password, saltRounds);
    

    const newUser = new UserDatabase({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        passwordHash: passwordHash
    });
    
    // create token for signin after signup

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err) {
        res.status(400).json(err);
        console.log(err)
    };
        
};


async function httpLogIn(req, res) {

    const user = req.body;
    
    if (!user.email || !user.password) {
        return res.status(400).json({
            error: 'Todos los campos son requeridos',
        });
    };
    
    const userFound = await UserDatabase
        .findOne({email: user.email});
        //.populate("roles");

    if (!userFound) return res.status(400).json('Usuario no encontrado');

    const validPassword = await bcrypt.compare(user.password, userFound.passwordHash);

    if (!validPassword) return res.status(401).json({token: null, error: "Contraseña incorrecta"});

    const { passwordHash, ...userData } = userFound._doc;

    const accessToken = createAccessToken(userFound._id, userFound.isAdmin);

    const refreshToken = createRefreshToken(userFound._id, userFound.isAdmin);

    res.cookie('jwt', refreshToken, {
        //domain: '.lanuderia.com',
        httpOnly: true, // accesible only by web server
        //secure: true, // when implementing https
        //sameSite: 'strict', // cross-site cookie
        maxAge: 180 * 60 * 1000 // cookie expiry match r tokne exp
    })

    res.cookie('loggedIn', 'true', {
        //domain: '.lanuderia.com',
        //secure: true, // when implementing https
        //sameSite: 'strict', // cross-site cookie
        maxAge: 180 * 60 * 1000 // cookie expiry match r tokne exp
    })

    res.cookie('userId', userData._id.toString(), {
        //domain: '.lanuderia.com',
        httpOnly: true, // accesible only by web server
        //secure: true, // when implementing https
        //sameSite: 'strict', // cross-site cookie
        maxAge: 180 * 60 * 1000 // cookie expiry match r tokne exp
    })

    if (userFound.isAdmin) {
        res.cookie('admin', 'true', {
            //domain: '.lanuderia.com',
            //secure: true, // when implementing https
            //sameSite: 'strict', // cross-site cookie
            maxAge: 180 * 60 * 1000 // cookie expiry match r tokne exp
        })
    }

    return res.status(200).json(accessToken);    //...userData,

};


async function refreshToken(req, res) {

    const cookies = req.headers.cookie;

    const parseCookie = str =>
    str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
                acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
                return acc;
            }, {}
    );

    const JWTCookie = parseCookie(cookies)?.jwt
    
    if (!JWTCookie) return res.status(403).json('No Autorizado')

    const refreshToken = JWTCookie;
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async(err, decoded) => {
                
            if (err) return res.status(403).json('No tienes permisos para acceder a este sitio');
            
            const userFound = await UserDatabase.findOne({_id: decoded.id});

            if (!userFound) return res.status(403).json('Usuario no encontrado');

            const accessToken = createAccessToken(userFound._id, userFound.isAdmin);
            
            res.json({ accessToken });

        })
    )

};


async function verifyAdminToken (req, res, next) {
   
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'No tienes permisos para acceder a este sitio'})
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
        asyncHandler(async(err, decoded) => {

            if (err) return res.status(403).json('No tienes permisos para acceder a este sitio');
            
            req.user = decoded;
            
            if (req.user.admin) {
                next();
            } else {
                return res.status(403).json({message: "Requires administrator role"});
            };

        })
    );
}


async function verifyToken (req, res, next) {
   
    const authHeader = req.headers.authorization || req.headers.Authorization
    
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'No tienes permisos para acceder a este sitio'})
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
        asyncHandler(async(err, decoded) => {

            if (err) return res.status(403).json('No tienes permisos para acceder a este sitio');
            
            req.user = decoded;
            
            next()

        })
    );
}


async function verifyRefreshToken (req, res, next) {
    
    const refreshToken = req.cookie.jwt;

    if (!refreshToken) {
        return res.status(403).json({ message: 'No tienes permisos para acceder a este sitio'})
    }

    
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async(err, decoded) => {

            if (err) return res.status(403).json('No tienes permisos para acceder a este sitio');
            
            req.user = decoded;
            
            next()

        })
    );
}

async function isLoggedIn(req, res) {
        
    res.status(200).json({isLoggedIn: true});

        
};



async function verifyTokenAndAdmin(req, res, next) {
    
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({message: "Requires administrator role"});
        };
    })
    
};


async function verifyTokenAndAuth(req, res, next) {

    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({message: "You are not allowed to do that!"});
        };
    })
    
};


async function httpLogOut(req, res) {

    const cookies = req.headers.cookie;

    const parseCookie = str =>
    str
    ?.split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
                acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
                return acc;
            }, {}
    );

    const JWTCookie = parseCookie(cookies)?.jwt

    if (!JWTCookie) return res.status(204);

    res.clearCookie('jwt', { 
        //domain: '.lanuderia.com',
        httpOnly: true, // accesible only by web server
        //secure: true, // when implementing https
        //sameSite: 'strict', // cross-site cookie
    }); //, secure: true , sameSite: 'None'}); https

    res.clearCookie('loggedIn', {
        //domain: '.lanuderia.com',
        //secure: true, // when implementing https
        //sameSite: 'strict', // cross-site cookie
    });

    res.clearCookie('userId', {
        //domain: '.lanuderia.com',
        httpOnly: true, // accesible only by web server
        //secure: true, // when implementing https
        //sameSite: 'strict', // cross-site cookie
    })

    res.clearCookie('admin', {
        //domain: '.lanuderia.com',
        //secure: true, // when implementing https
        //sameSite: 'strict', // cross-site cookie
    });

    res.json({message: 'Cookie cleared'});

}



async function httpForgotPassword(req, res) {

    const email = req.body.email;
    
    const userFound = await UserDatabase.findOne({email: email});


    if (!userFound) return res.status(400).json('Usuario no encontrado');

        const token = jwt.sign({_id: userFound._id}, process.env.RESET_PASSWORD_KEY, {expiresIn: '15m'})

        let transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: 'admin@borealisdevs.com',
                pass: process.env.EMAIL_PASS,
            },
            tls : { rejectUnauthorized: false }
        })

        const data = {
            from: 'La Nuderia <admin@borealisdevs.com>',  // sender email
            to: email,
            subject: 'Resetear la password de tu cuenta de la nuderia',
            html: `
            <h3>Por favor sigue el link a continuacion para generar una nueva contraseña para tu cuenta en la nuderia.</h3>
            <a>localhost:3000/reset-password/${token}</a>
            `,  // change client url
        }

        {/*return UserDatabase.updateOne({resetLink: token}, (err, userFound) => {
            if (err) {
                console.log(ok)
                return res.status(400).json({error: 'reset password link error'})
            } else {
                transporter.sendMail(data, function(error, body) {
                    if (error) {
                        return res.status(400).json({error: error.message})
                    }
                    return res.status(200).json({message: 'Email has been sent, to reset password'})
                })
            }
        })*/}


        try {
            const updatedUser = await UserDatabase.updateOne({ _id: userFound._id}, {
                $set: { resetLink: token }
            })
            transporter.sendMail(data, function(error, body) {
                if (error) {
                    return res.status(400).json({error: error.message})
                }
                return res.status(200).json({message: 'Email has been sent, to reset password'})
            })
        } catch (err) {
            console.log(err);
            return res.status(400).json({error: 'reset password link error'})
        }

}


async function httpUpdatePassword(req, res) {

    const {token, password} = req.body;

    const saltRounds = 10; 
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (token) {
        jwt.verify(token, process.env.RESET_PASSWORD_KEY, function (error, decodedData) {
            if (error) {
                return res.status(400).json({error: 'Incorrect or expired reset password token.'})
            }
            UserDatabase.findOne({resetLink: token}, (err, userFound) => {
                if (err || !userFound) {
                    return res.status(400).json({error: 'This user does not exist!'})
                }

                userFound.passwordHash = passwordHash
                userFound.save((err, result) => {
                    if (err) {
                        return res.status(400).json({error: 'Reset password error.'})
                    } else {
                        return res.status(200).json({message: 'Your password has been changed succesfully!'})
                    }
                })
            })
        })
    } else {
        return res.status(401).json({error: 'Authentication error.'})
    }

}




module.exports = {
    httpSignUp,
    httpLogIn,
    verifyAdminToken,
    verifyToken,
    verifyTokenAndAuth,
    verifyTokenAndAdmin,
    httpLogOut,
    refreshToken,
    httpForgotPassword,
    httpUpdatePassword,
    verifyRefreshToken
};