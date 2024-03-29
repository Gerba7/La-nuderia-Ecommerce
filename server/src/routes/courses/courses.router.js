const express = require('express');
const { verifyAdminToken, verifyToken, verifyRefreshToken } = require('../auth/auth.controller');
const { httpUploadVideo, httpGetAllUploadedCourses, httpGetUploadedVideo, httpSaveVideoInfo, httpDeleteCourseVideos,
    httpGetAllCoursesAdmin, httpDeleteCourse, httpGetUploadedCourse, httpUploadThumbnail, httpUploadVimeoVideo } = require('./courses.controller');
const { s3 } = require('../../services/aws');     //const AWS = require('../../services/aws'); 
const multer = require('multer');
const multerS3 = require('multer-s3');




const coursesRouter = express.Router();

const maxFileSize = 25000 * 1024 * 1024;

const upload = multer({
    limits: { fileSize: maxFileSize },
    storage: multer.memoryStorage(),
  });


// const s3 = new AWS.S3(); 

// const upload = multer({
//     limits: {fileSize: maxFileSize},
//     storage: new multerS3({
//         s3: s3,
//         bucket: 'la-nuderia-camila',
//         acl: 'private',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         metadata: function (req, file, cb) {
//             cb(null, {fieldName: file.fieldname});
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString() + '-' + file.originalname)
//         }
//     })
// })


coursesRouter.post('/upload', verifyAdminToken,  upload.array('videoFiles', 20), httpUploadVideo);
coursesRouter.post('/thumbnail', verifyAdminToken,  upload.single('thumbnail'), httpUploadThumbnail);
coursesRouter.post('/delete-videos', verifyAdminToken, httpDeleteCourseVideos);
coursesRouter.post('/saveInfo', verifyAdminToken, httpSaveVideoInfo);
coursesRouter.get("/video/:active", verifyToken, httpGetUploadedVideo);
coursesRouter.get("/courses-admin", verifyAdminToken, httpGetAllCoursesAdmin);
coursesRouter.get("/course/:id", httpGetUploadedCourse);
coursesRouter.get("/", httpGetAllUploadedCourses);
coursesRouter.delete('/delete/:id', verifyAdminToken, httpDeleteCourse);
coursesRouter.post('/tutorial', verifyAdminToken,  upload.array('videoFiles', 20), httpUploadVimeoVideo);




module.exports = coursesRouter;