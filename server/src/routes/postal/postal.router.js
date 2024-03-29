const express = require('express');
const { verifyAdminToken } = require('../auth/auth.controller');
const { httpCreatePostalPrice, htttpDeleteCategory, htttpGetCategory, htttpGetAllPostalPrices, htttpUpdatePostalPrices, htttpGetPostalZone } = require('./postal.controller');


const postalRouter = express.Router();

postalRouter.post("/", httpCreatePostalPrice);  // 
postalRouter.post("/zone", htttpGetPostalZone);
postalRouter.put("/", verifyAdminToken, htttpUpdatePostalPrices);
//postalRouter.get("/:id", verifyAdminToken, htttpGetCategory);
postalRouter.get("/", htttpGetAllPostalPrices);


module.exports = postalRouter;