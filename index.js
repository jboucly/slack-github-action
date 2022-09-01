require('dotenv').config();
const http = require("http");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const host = 'localhost';
const port = 8000;

// ––– FUNCTIONS ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const convertBufferToJson = async (req) => {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    return JSON.parse(Buffer.concat(buffers).toString());
}

const sendNotificationToUrl = async (githubData) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.SLACK_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    let body;
    const githubActionStatus = githubData.check_run.status;
    const githubActionConclusion = githubData.check_run.conclusion;

    switch (githubActionStatus) {
        case 'queued':
            body = {
                emoji: ':arrows_counterclockwise:',
                message: 'Une pipeline vient d\'être lancée'
            };
            break;
        case 'completed':
            if (githubActionConclusion === 'success') {
                body = {
                    emoji: ':white_check_mark:',
                    message: 'Pipeline complété avec succès'
                };
            } else if (githubActionConclusion === 'failure') {
                body = {
                    emoji: ':x:',
                    message: 'Une pipeline vient de fail !',
                };
            }
            break;
    }

    if (body) xhr.send(JSON.stringify(body));
}


const requestListener = async (req, res) => {
    await sendNotificationToUrl(await convertBufferToJson(req));
    res.writeHead(200);
    res.end();
};

// ––– SERVER ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});