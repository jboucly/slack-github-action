require('dotenv').config();
const http = require('http');
const { ConvertBufferToJson } = require('./src/utils/convert-buffer-to-json');
const { sendSlackNotification } = require('./src/functions/send-slack-notification');
const { sendDiscordNotifications } = require('./src/functions/send-discord-notification');

const port = process.env.PORT || 8000;
const host = process.env.HOST || '0.0.0.0';

// ––– FUNCTIONS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const requestListener = async (req, res) => {
    console.info(`URL => ${req.url}`);

    switch (req.url) {
        case '/github-actions/slack':
            await sendSlackNotification(await ConvertBufferToJson(req));
            break;

        case '/github-actions/discord':
            await sendDiscordNotifications(await ConvertBufferToJson(req));
            break;

        default:
            console.info("This route doesn't exist");
            break;
    }

    res.writeHead(200);
    res.end('App work, awaiting instruction !');
};

// ––– SERVER ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.info(`Server is running on http://${host}:${process.env.PORT}`);
});
