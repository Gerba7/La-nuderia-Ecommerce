const express = require('express');
const { verifyAdminToken } = require('../auth/auth.controller');
const { httpCreateCategory, htttpDeleteCategory, htttpGetCategory, htttpGetAllCategories } = require('./categories.controller');


const categoriesRouter = express.Router();

categoriesRouter.post("/", verifyAdminToken, httpCreateCategory);
categoriesRouter.delete("/:id", verifyAdminToken, htttpDeleteCategory);
categoriesRouter.get("/:id", verifyAdminToken, htttpGetCategory);
categoriesRouter.get("/", htttpGetAllCategories);


module.exports = categoriesRouter;