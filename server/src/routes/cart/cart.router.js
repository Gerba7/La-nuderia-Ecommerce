const express = require('express');
const { verifyTokenAndAuth, verifyTokenAndAdmin } = require('../auth/auth.controller');
const { httpCreateCart, htttpUpdateCart, htttpDeleteCart,
    htttpGetCart, htttpGetAllCarts } = require('./cart.controller');



const cartRouter = express.Router();



cartRouter.post('/', httpCreateCart);
cartRouter.put('/:id', verifyTokenAndAuth, htttpUpdateCart);
cartRouter.delete('/:id', verifyTokenAndAuth, htttpDeleteCart);
cartRouter.get('/:userId', verifyTokenAndAuth, htttpGetCart);
cartRouter.get('/', verifyTokenAndAdmin, htttpGetAllCarts);



module.exports = cartRouter;