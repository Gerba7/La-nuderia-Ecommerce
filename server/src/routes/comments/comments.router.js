const express = require('express');
const { verifyAdminToken, verifyToken } = require('../auth/auth.controller');
const { httpPostCourseComment, httpGetCourseComments, httpPostCourseReply } = require('./comments.controller');



const commentsRouter = express.Router();


commentsRouter.post('/new-comment', verifyToken, httpPostCourseComment);
commentsRouter.post('/reply/:commentId', verifyToken, httpPostCourseReply);
commentsRouter.get("/:courseId", verifyToken, httpGetCourseComments);




module.exports = commentsRouter;