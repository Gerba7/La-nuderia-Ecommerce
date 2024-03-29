const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const csp = require('helmet-csp');
const api = require('./routes/api');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

const app = express();

app.use(cors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'http://localhost:3002',
                'https://lanuderia.com', 'https://admin.lanuderia.com', 'http://lanuderia.com', 'http://admin.lanuderia.com', 'https://cursos.lanuderia.com',
                'http://cursos.lanuderia.com'],
    credentials: true,
}));

app.use(helmet());


app.use(morgan('combined'));

app.use(cookieParser());

app.use(bodyParser.json({ limit: '20000mb' })); // Set the body limit to a value 

app.use(express.json());

app.use(limiter);

//app.use('/', express.static(path.join(__dirname , '..' , 'public'))); // to serve static files as html, .css, etc, we serve the public front end

//app.use((req, res, next) => {
//    if (req.hostname.startsWith('admin.')) {
//      express.static(path.join(__dirname , '..' , 'public2'))(req, res, next);
//    } else {
//      next();
//    }
//  });

app.use('/v1', api);

module.exports = app;