require('dotenv').config();
const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
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

app.listen(port, () => {
    console.info(`Server is running on http://localhost:${port}}`);
});

setRoutes(app);

module.exports = app;
