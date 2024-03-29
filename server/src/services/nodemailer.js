const nodemailer = require("nodemailer");
const { google } = require("googleapis");

require('dotenv').config();



async function sendMail (user, subject, img) {

    try {
        
        {/*const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'la.nuderia.camila@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
            tls: {
                rejectUnauthorized: false
            }
        });*/}
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: 'macrame@lanuderia.com',
                pass: process.env.EMAIL_PASS,
            },
            tls : { rejectUnauthorized: false }
        })

        const mailOptions = {
            from: 'La Nuderia <macrame@lanuderia.com>',
            bcc: user,
            subject: subject,
            text: '',
            html: `<div><img src=${img} /></div>`,
            attachments: [
                {
                    filename: img,
                    path: img,
                    cid: img,
                }
            ]
        };

        const res = await transporter.sendMail(mailOptions);

        return res;
        
        
    } catch(err) {

        console.log(err);

    }



}



async function orderMail (subject, html) {
    
    try {
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: 'macrame@lanuderia.com',
                pass: process.env.EMAIL_PASS,
            },
            tls : { rejectUnauthorized: false }
        })

        const mailOptions = {
            from: 'La Nuderia <macrame@lanuderia.com>',
            bcc: 'macrame@lanuderia.com',
            subject: subject,
            html: html,
        };

        const res = await transporter.sendMail(mailOptions);

        return res;
        
        
    } catch(err) {

        console.log(err);

    }



}


async function confirmationMail (subject, email) {   //, html

    const img = 'https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/pedido_confirmado.jpg?alt=media&token=40745d8f-001a-4b51-8344-20e65672d1b5';
    
    try {
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: 'macrame@lanuderia.com',
                pass: process.env.EMAIL_PASS,
            },
            tls : { rejectUnauthorized: false }
        })

        const mailOptions = {
            from: 'La Nuderia <macrame@lanuderia.com>',
            bcc: email,
            subject: subject,
            //html: html,
            html: `<div><img src=${img} /></div>`,
            attachments: [
                {
                    filename: img,
                    path: img,
                    cid: img,
                }
            ]
            
        };

        const res = await transporter.sendMail(mailOptions);

        return res;
        
        
    } catch(err) {

        console.log(err);

    }



}





async function sentMail (subject, trackingId, email, filePath) {

    const img = 'https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/pedido_enviado.jpg?alt=media&token=bacfb60f-beb0-4889-a999-74cb35fc3dff'
    
    try {
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: 'macrame@lanuderia.com',
                pass: process.env.EMAIL_PASS,
            },
            tls : { rejectUnauthorized: false }
        })
        

        const mailOptions = {
            from: 'La Nuderia <macrame@lanuderia.com>',
            bcc: email,
            subject: subject,
            html:`
			<html>
				<body>
                    <h3><b>N° de seguimiento:</b> ${trackingId}</h3>
				</body>
                <div><img src=${img} /></div>
			</html>
		`
        };
        
        if (filePath && filePath !== null) {
            
            const attachment = {
                filename: 'Factura.pdf',
                path: filePath,
            }

            mailOptions.attachments = [attachment]
        }

        const res = await transporter.sendMail(mailOptions);

        return res;
        
        
    } catch(err) {

        console.log(err);

    }



}





async function confirmationCourseMail (subject, email, filePathArray) {   //, html

    const img = 'https://firebasestorage.googleapis.com/v0/b/la-nuderia.appspot.com/o/Curso%20confirmado.JPG?alt=media&token=d74c9dfb-1dc5-4612-b6fb-461295700cee';
    
    try {
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: 'macrame@lanuderia.com',
                pass: process.env.EMAIL_PASS,
            },
            tls : { rejectUnauthorized: false }
        })
        

        const mailOptions = {
            from: 'La Nuderia <macrame@lanuderia.com>',
            bcc: email,
            subject: subject,
            html:`
			<html>
                <div><img src=${img} /></div>
			</html>
		`
        };
        
        if (filePathArray && filePathArray !== null) {

            const attachments = [];
            
            filePathArray.forEach((filePath) => {
                if (filePath !== null) {
                const attachment = {
                    filename: filePath.slice(filePath.length - 7) + '.pdf',
                    path: filePath,
                }
                attachments.push(attachment)
            }
            })

            mailOptions.attachments = attachments
        }

        const res = await transporter.sendMail(mailOptions);

        return res;
        
        
    } catch(err) {

        console.log(err);

    }



}





async function borealisMail(subject, html) {
    
    try {
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.hostinger.com',
            port: 465,
            secure: true,
            auth: {
                user: 'macrame@lanuderia.com',
                pass: process.env.EMAIL_PASS,
            },
            tls : { rejectUnauthorized: false }
        })

        const mailOptions = {
            from: 'La Nuderia <macrame@lanuderia.com>',
            bcc: 'borealisdevs@gmail.com',
            subject: subject,
            html: html,
        };

        const res = await transporter.sendMail(mailOptions);

        return res;
        
        
    } catch(err) {

        console.log(err);

    }



}


module.exports = {
    sendMail,
    orderMail,
    confirmationMail,
    sentMail,
    borealisMail,
    confirmationCourseMail
};
