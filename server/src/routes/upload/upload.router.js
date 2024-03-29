const express = require('express');
const { verifyAdminToken, verifyToken } = require('../auth/auth.controller');
const { httpHandleFileUpload, httpHandlePdfsUpload, httpDownloadPdfs, httpHandleThumbUpload } = require('./upload.controller');
const multer = require('multer');


const uploadRouter = express.Router();

const upload = multer({ dest: '/usr/local/lsws/uploads' });

const uploadPDFs = multer({ dest: '/usr/local/lsws/pdfs' });

const uploadThumb = multer({ dest: '/usr/local/lsws/uploads/thumbs' })


uploadRouter.post("/", verifyAdminToken, upload.single('file'), httpHandleFileUpload);
uploadRouter.post("/pdfs", verifyAdminToken, uploadPDFs.array('pdfs', 10), httpHandlePdfsUpload);
uploadRouter.post("/thumb", verifyAdminToken, uploadThumb.single('thumb'), httpHandleThumbUpload);




module.exports = uploadRouter;