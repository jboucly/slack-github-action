require('dotenv').config();
const express = require('express');
const { setRoutes } = require('./src/routes');

const port = process.env.PORT || 8000;
const host = process.env.HOST || '0.0.0.0';

const app = express();

app.use(express.json());

app.listen(port, host, () => {
    console.info(`Server is running on http://${host}:${process.env.PORT}`);
});

setRoutes(app);

module.exports = app;
