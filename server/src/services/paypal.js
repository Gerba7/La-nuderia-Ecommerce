const axios = require('axios');

require('dotenv').config();





async function createPaypalOrder(order) {

    const testUrl = 'https://api-m.sandbox.paypal.com';

    const productionUrl= 'https://api-m.paypal.com';

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials')

    const { data: {access_token}} = await axios.post(`${productionUrl}/v1/oauth2/token`, params, {
        auth: {
            username: process.env.PAYPAL_API_CLIENT,
            password: process.env.PAYPAL_API_SECRET
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer `
        }
    })  // to get accessToken from paypal
    
    const paypalOrder = await axios.post(`${productionUrl}/v2/checkout/orders`, order, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });

    
    return paypalOrder.data;

}


async function capturePaypalOrder(token, payerID) {

    const testUrl = 'https://api-m.sandbox.paypal.com';

    const productionUrl= 'https://api-m.paypal.com';
    
    
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials')

    const { data: {access_token}} = await axios.post(`${productionUrl}/v1/oauth2/token`, params, {
        auth: {
            username: process.env.PAYPAL_API_CLIENT,
            password: process.env.PAYPAL_API_SECRET
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer `
        }
    })  // to get accessToken from paypal

    const paypalCapture = await axios.post(`${productionUrl}/v2/checkout/orders/${token}/capture`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    })
    

    
    return paypalCapture.data;

}




module.exports = {
    createPaypalOrder,
    capturePaypalOrder
}

