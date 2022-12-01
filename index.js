require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { setRoutes } = require('./src/routes');

const app = express();

app.use(
    bodyParser.json({
        verify: (req, res, buf, encoding) => {
            if (buf && buf.length) {
                req.rawBody = buf.toString(encoding || 'utf8');
            }
        },
    })
);
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'src', 'public')));

if (process.env.NODE_ENV === 'development') {
    app.listen(3000, 'localhost', () => {
        console.info(`Server is running on http://localhost:3000`);
    });
}

setRoutes(app);

module.exports = app;
