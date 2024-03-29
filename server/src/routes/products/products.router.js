const express = require('express');
const { verifyAdminToken } = require('../auth/auth.controller');
const { httpCreateProduct, htttpUpdateProduct, htttpDeleteProduct,
    htttpGetProduct, htttpGetAllProducts } = require('./products.controller');



const productsRouter = express.Router();


productsRouter.post('/', verifyAdminToken, httpCreateProduct);
productsRouter.put('/:id', verifyAdminToken, htttpUpdateProduct);
productsRouter.delete('/:id', verifyAdminToken, htttpDeleteProduct);
productsRouter.get('/:id', htttpGetProduct);
productsRouter.get('/', htttpGetAllProducts);


module.exports = productsRouter;