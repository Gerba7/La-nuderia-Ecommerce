const express = require('express');
const { verifyTokenAndAuth, verifyTokenAndAdmin, verifyAdminToken } = require('../auth/auth.controller');
const { httpCreateOrder, httpUpdateOrder, httpDeleteOrder,
    httpGetOrder, httpGetAllOrders, httpGetOrdersStats,
    httpGetOrdersSemestral, httpGetCashOrders, httpGetOnlineOrders, 
    httpGetActualIncome, httpGetTodayIncome, 
    httpSendConfirmationMail, httpSentOrderMail, httpUpdateOrderSent, httpSendConfirmationCourseMail } = require('./order.controller');


const ordersRouter = express.Router();



ordersRouter.post("/", httpCreateOrder); // verifytoken
ordersRouter.get("/actualincome", verifyAdminToken, httpGetActualIncome);
ordersRouter.get("/todayincome", verifyAdminToken, httpGetTodayIncome);
ordersRouter.get("/income", verifyAdminToken, httpGetOrdersStats);
ordersRouter.get("/semester", verifyAdminToken, httpGetOrdersSemestral);
ordersRouter.get("/cash", verifyAdminToken, httpGetCashOrders);
ordersRouter.get("/online",verifyAdminToken, httpGetOnlineOrders);
ordersRouter.put("/:id", verifyAdminToken, httpUpdateOrder);
ordersRouter.put("/sent/:id", verifyAdminToken, httpUpdateOrderSent);
ordersRouter.delete("/:id", verifyAdminToken, httpDeleteOrder);
ordersRouter.get("/:userId", verifyAdminToken, httpGetOrder);
ordersRouter.get("/", verifyAdminToken, httpGetAllOrders);
ordersRouter.post("/confirm-order", httpSendConfirmationMail);
ordersRouter.post("/confirm-course-order", httpSendConfirmationCourseMail);
ordersRouter.post("/sent-order", httpSentOrderMail);




module.exports = ordersRouter;