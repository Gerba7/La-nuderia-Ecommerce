const axios = require('axios');

require('dotenv').config();

async function createPayment(body) {

    const url = 'https://api.mercadopago.com/checkout/preferences';

    const payment = await axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`
        }
    });

    return payment.data;

}


async function createSubscription(body) {

    const url = 'https://api.mercadopago.com/preapproval';

    const subscription = await axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.ACCESS_TOKEN_MP}`
        }
    });

    return subscription.data;

}



module.exports = {
    createPayment,
    createSubscription
}