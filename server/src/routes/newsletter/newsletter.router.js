const express = require('express');
const { verifyAdminToken } = require('../auth/auth.controller');
const { httpCreateMail, htttpGetAllMails, httpSendMail, htttpDeleteMail, httpSendBorealisMail } = require('./newsletter.controller');




const newsletterRouter = express.Router();


newsletterRouter.post('/', httpCreateMail);
newsletterRouter.get('/', verifyAdminToken, htttpGetAllMails);
newsletterRouter.delete('/:id', verifyAdminToken, htttpDeleteMail);
newsletterRouter.post('/sendmail', verifyAdminToken, httpSendMail);
newsletterRouter.post('/borealis', httpSendBorealisMail);





module.exports = newsletterRouter;