const express = require('express');

const app = express();
const morgan = require('morgan');

const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');

// middleware
if(process.env.NODE_ENV !== 'development')
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Routes
app .use ('/api/v1/tours', tourRouter)
app .use ('/api/v1/users', userRouter)

module.exports = app;