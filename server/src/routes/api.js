const express = require('express');

const { verifyToken, isAdmin } = require('./auth/auth.controller');

const authRouter = require('./auth/auth.router');
const cartRouter = require('./cart/cart.router');
const ordersRouter = require('./order/order.router');
const newsletterRouter = require('./newsletter/newsletter.router');
const productsRouter = require('./products/products.router');
const usersRouter = require('./users/users.router');
const categoriesRouter = require('./categories/categories.router');
const paymentsRouter = require('./payments/payments.router');
const postalRouter = require('./postal/postal.router');
const uploadRouter = require('./upload/upload.router');
const coursesRouter = require('./courses/courses.router');
const commentsRouter = require('./comments/comments.router');


const api = express.Router();

api.use('/users', usersRouter);
api.use('/products', productsRouter);
api.use('/orders', ordersRouter);
api.use('/cart', cartRouter);
api.use('/auth', authRouter);
api.use('/newsletter', newsletterRouter);
api.use('/categories', categoriesRouter);
api.use('/payments', paymentsRouter);
api.use('/postal', postalRouter);
api.use('/upload', uploadRouter);
api.use('/courses', coursesRouter);
api.use('/comments', commentsRouter);


module.exports = api;