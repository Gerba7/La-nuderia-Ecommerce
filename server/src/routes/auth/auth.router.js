const express = require('express');
const { httpSignUp, httpLogIn, httpLogOut,
    refreshToken, 
    httpForgotPassword,
    httpUpdatePassword} = require('./auth.controller');


const authRouter = express.Router();


authRouter.post("/signup", httpSignUp);
authRouter.post("/login", httpLogIn);
authRouter.get("/refresh", refreshToken);
authRouter.post("/logout", httpLogOut);
authRouter.put("/forgotPassword", httpForgotPassword);
authRouter.put("/resetPassword", httpUpdatePassword);
{/*authRouter.get("/isloggedin", verifyToken, isLoggedIn);*/}


module.exports = authRouter;