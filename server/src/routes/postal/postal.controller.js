const PostalDatabase = require('../../models/postal/postal.mongo');
const { ObjectId } = require('mongodb');
const postals = require('../../data/postals')



async function httpCreatePostalPrice(req, res) {
    
    const newPostalPrice = new PostalDatabase(req.body)

    try {
        const savedPostalPrice = await newPostalPrice.save();
        res.status(201).json(savedPostalPrice);
    } catch (err) {
        res.status(400).json('Error al crear precio');
        console.log(err)
    }
}



async function htttpUpdatePostalPrices(req, res) {

    
    try {
        const updated1 = await PostalDatabase.updateOne({ _id: ObjectId("64e28eba76cfc175aae8a92d")}, {
            $set: { zoneA: req.body.zoneA1, zoneB: req.body.zoneB1, zoneC: req.body.zoneC1, zoneD: req.body.zoneD1 }
        });
        const updated2 = await PostalDatabase.updateOne({ _id: ObjectId("64e28eec76cfc175aae8a92f")}, {
            $set: { zoneA: req.body.zoneA2, zoneB: req.body.zoneB2, zoneC: req.body.zoneC2, zoneD: req.body.zoneD2 }
        });
        const updated3 = await PostalDatabase.updateOne({ _id: ObjectId("64e28f1276cfc175aae8a931")}, {
            $set: { zoneA: req.body.zoneA3, zoneB: req.body.zoneB3, zoneC: req.body.zoneC3, zoneD: req.body.zoneD3 }
        });
        const updated5 = await PostalDatabase.updateOne({ _id: ObjectId("64e28f3c76cfc175aae8a933")}, {
            $set: { zoneA: req.body.zoneA5, zoneB: req.body.zoneB5, zoneC: req.body.zoneC5, zoneD: req.body.zoneD5 }
        });
        const updated10 = await PostalDatabase.updateOne({ _id: ObjectId("64e28f6276cfc175aae8a935")}, {
            $set: { zoneA: req.body.zoneA10, zoneB: req.body.zoneB10, zoneC: req.body.zoneC10, zoneD: req.body.zoneD10 }
        });
        const updated15 = await PostalDatabase.updateOne({ _id: ObjectId("64e28f8476cfc175aae8a937")}, {
            $set: { zoneA: req.body.zoneA15, zoneB: req.body.zoneB15, zoneC: req.body.zoneC15, zoneD: req.body.zoneD15 }
        });
        
        res.status(201).json(updated1, updated2, updated3, updated5, updated10, updated15);
    } catch (err) {
        res.status(400).json('Error al crear precio');
        console.log(err)
    }
 

};


async function htttpGetAllPostalPrices(req, res) {

    try {
        const postalPrices = await PostalDatabase.find();
        res.status(200).json(postalPrices)
    } catch (err) {
        res.status(400).json('Error al cargar precios postales');
    }
    
};


async function htttpGetPostalZone(req, res) {

    const postal = req.body.postal;

    const getZone = () => {
        return postals[postal]
    }

    const zone = getZone();

    try {

        return res.status(200).json({postalZone: zone})

    } catch (err) {
        res.status(400).json('Error al cargar precios postales');
    }
    
};




module.exports = {
    httpCreatePostalPrice,
    htttpGetAllPostalPrices,
    htttpUpdatePostalPrices,
    htttpGetPostalZone
};

