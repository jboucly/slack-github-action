const path = require('path');
const packageJson = require('../package.json');
const { verifySecret } = require('./functions/verify-secret');
const { sendSlackNotification } = require('./functions/send-slack-notification');
const { sendDiscordNotifications } = require('./functions/send-discord-notification');

const setRoutes = (app) => {
    app.get('/', async (req, res) => {
        res.render(path.join(__dirname, 'public', 'pages', 'home.html'), {
            version: packageJson.version,
        });
    });

    app.post('/github-actions/discord', verifySecret, async (req, res) => {
        await sendDiscordNotifications(req.body);
        res.status(200).send();
    });

    app.post('/github-actions/slack', verifySecret, async (req, res) => {
        await sendSlackNotification(req.body);
        res.status(200).send();
    });
};

exports.setRoutes = setRoutes;
