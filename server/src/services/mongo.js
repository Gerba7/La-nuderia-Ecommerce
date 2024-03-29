const mongoose = require('mongoose');

require('dotenv').config({ path: '/usr/local/lsws/Server/.env' }); // config path only in deployment   

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
};

async function mongoDisconnect() {
    await mongoose.disconnect();
};


module.exports = {
    mongoConnect,
    mongoDisconnect,
};