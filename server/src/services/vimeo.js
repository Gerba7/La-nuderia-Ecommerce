const Vimeo = require('vimeo').Vimeo;

require('dotenv').config();


const client = new Vimeo(`${process.env.VIMEO_CLIENT_ID}`, `${process.env.VIMEO_CLIENT_SECRET}`, `${process.env.VIMEO_ACCESS_TOKEN}`);



module.exports = {
  client
};