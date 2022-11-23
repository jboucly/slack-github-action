require('dotenv').config();
const express = require('express');
const { setRoutes } = require('./src/routes');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.listen(3000, 'localhost', () => {
        console.info(`Server is running on http://localhost:3000`);
    });
}

setRoutes(app);

module.exports = app;
