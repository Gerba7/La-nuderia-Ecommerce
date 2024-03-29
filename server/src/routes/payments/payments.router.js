const express = require('express');
const { httpCreatePreference, httpGetPaymentFeedback, httpCreateSubscription,
    httpCreatePaypalOrder, httpCapturePaypalOrder, httpSendOrderMail, httpCreateCoursePreference } = require('./payments.controller');



const paymentsRouter = express.Router();


paymentsRouter.post('/checkout', httpCreatePreference);
paymentsRouter.post('/course-checkout', httpCreatePreference);
paymentsRouter.post('/subscription', httpCreateSubscription);
paymentsRouter.post('/paypal/create-order', httpCreatePaypalOrder);
paymentsRouter.post('/order-mail', httpSendOrderMail);
paymentsRouter.get('/paypal/capture-order', httpCapturePaypalOrder);



module.exports = paymentsRouter;