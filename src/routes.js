const path = require('path');
const packageJson = require('../package.json');
const { verifySecret } = require('./functions/verify-secret');
const { sendSlackNotification } = require('./functions/send-slack-notification');
const { sendDiscordNotifications } = require('./functions/send-discord-notification');

const setRoutes = (app) => {
    if (Boolean(process.env.DOC_IS_ACTIVE)) {
        app.get('/', async (req, res) => {
            res.render(path.join(__dirname, 'public', 'pages', 'home.html'), {
                version: packageJson.version,
            });
        });
    }
    app.post('/github-actions/discord', verifySecret, async (req, res) => {
        await sendDiscordNotifications(req.body);
        res.status(200).send();

        console.info('Discord notification sent');
    });

    app.post('/github-actions/slack', verifySecret, async (req, res) => {
        await sendSlackNotification(req.body);
        res.status(200).send();
        console.info('Slack notification sent');
    });
};

exports.setRoutes = setRoutes;
