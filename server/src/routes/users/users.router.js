const express = require('express');
const { verifyAdminToken, verifyTokenAndAdmin, verifyToken } = require('../auth/auth.controller');
const { htttpUpdateUser, htttpDeleteUser, htttpGetUser, 
    htttpGetAllUsers, htttpUsersStats, htttpUpdateUserCourseAccess,
    httpPurchaseCourse, httpGetPurchasedCourses } = require('./users.controller');


const usersRouter = express.Router();


usersRouter.get("/stats", verifyAdminToken, htttpUsersStats);
usersRouter.get("/my-courses", verifyToken, httpGetPurchasedCourses);
usersRouter.put("/:id", verifyAdminToken, htttpUpdateUserCourseAccess);
usersRouter.delete("/:id", verifyAdminToken, htttpDeleteUser);
usersRouter.get("/", verifyAdminToken, htttpGetAllUsers);
usersRouter.get("/:id", verifyAdminToken, htttpGetUser);
usersRouter.post("/purchase-course", verifyAdminToken, httpPurchaseCourse);  //verifyToken



module.exports = usersRouter;