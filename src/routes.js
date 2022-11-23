const { sendSlackNotification } = require('./functions/send-slack-notification');
const { sendDiscordNotifications } = require('./functions/send-discord-notification');

const setRoutes = (app) => {
    app.get('/', async (req, res) => {
        res.status(200).send(
            'App work, awaiting instruction ! (see: https://github.com/jboucly/webhook-github-action)'
        );
    });

    app.post('/github-actions/discord', async (req, res) => {
        await sendDiscordNotifications(req.body);
        res.status(200);
    });

    app.post('/github-actions/slack', async (req, res) => {
        await sendSlackNotification(req.body);
        res.status(200);
    });
};

exports.setRoutes = setRoutes;
