const NewsletterDatabase = require('../../models/newletter/newsletter.mongo');
const { sendMail, borealisMail } = require('../../services/nodemailer');
const validator = require('validator');


async function httpCreateMail(req, res) {

    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({error:'El email no es valido'});
    };
    
    const emailFound = await NewsletterDatabase.findOne({
        email: req.body.email,
    })

    if (emailFound) {
        return res.status(403).json("Este mail ya existe en nuestra base de datos")
    } else {
        const newMail = new NewsletterDatabase(req.body)

        try {
            const savedMail = await newMail.save();
            res.status(201).json(savedMail);
        } catch (err) {
            res.status(400).json('Error al crear nuevo mail');
    }
    }


    
}


async function htttpGetAllMails(req, res) {

    try {
        const mails = await NewsletterDatabase.find();
        res.status(200).json(mails)
    } catch (err) {
        res.status(400).json('Error al cargar los emails');
    }
    
};


async function httpSendMail(req, res) {

    try{

        const email = req.body;
        
        await sendMail(email.email, email.subject, email.img)

        res.status(200).json('Enviado')

    } catch (err) {
        res.status(400).json('Error al enviar el newsletter')
    }

}


async function htttpDeleteMail(req, res) {
    
    try {
        await NewsletterDatabase.findByIdAndDelete(req.params.id);
        res.status(200).json("El mail fue eliminado con exito!");
    } catch (err) {
        res.status(400).json('Error al intentar eliminar el mail');
    };

};


async function httpSendBorealisMail(req, res) {

    
        
    try{
        
        const formData = req.body;
        
		let subject = `Tenes una nueva consulta!`
		
		let htmlContent = `
			<html>
				<body>
					<h3><b>Nombre y Apellido:</b></h3>
                    <p>${formData.name}</p>
					<br>
					<h3><b>Email:</b></h3>
                    <p>${formData.email}</p>
					<br>
					<h3><b>Telefono:</b></h3>
                    <p>${formData.phonenumber}</p>
					<br>
					<h3><b>Consulta:</b></h3>
                    <p>${formData.comments}</p>
					<br>
				</body>
			</html>
		`
		
		try{
			await borealisMail(subject, htmlContent)
		} catch (err) {
			console.log(err)
		}

        res.status(200).json('Enviado')

    } catch (err) {
        res.status(400).json('Error al enviar mail de compra')
    }

}



module.exports = {
    httpCreateMail,
    htttpGetAllMails,
    httpSendMail,
    htttpDeleteMail,
    httpSendBorealisMail
};