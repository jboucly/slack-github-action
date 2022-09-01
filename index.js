require('dotenv').config();
const http = require("http");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const host = 'localhost';
const port = process.env.PORT || 8000;

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

    const githubRepoName = githubData.repository.name;
    const githubActionUrl = githubData.check_run.html_url;
    const githubActionStatus = githubData.check_run.status;
    const githubActionConclusion = githubData.check_run.conclusion;

    let body = {
        url: githubActionUrl,
        repoName: githubRepoName,
    };

    switch (githubActionStatus) {
        case 'queued':
            body = {
                ...body,
                emoji: ':arrows_counterclockwise:',
                message: 'Une pipeline vient d\'être lancée',
            };
            break;
        case 'completed':
            if (githubActionConclusion === 'success') {
                body = {
                    ...body,
                    emoji: ':white_check_mark:',
                    message: 'Pipeline complété avec succès',
                };
            } else if (githubActionConclusion === 'failure') {
                body = {
                    ...body,
                    emoji: ':x:',
                    message: 'Pipeline fail',
                };
            }
            break;
    }

    if (body) xhr.send(JSON.stringify(body));
}


const requestListener = async (req, res) => {
    console.info(`URL => ${req.url}`);

    if (req.url !== '/' && req.url !== '/favicon.ico') {
        await sendNotificationToUrl(await convertBufferToJson(req));
    }

    res.writeHead(200);
    res.end('App work !');
};

// ––– SERVER ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.info(`Server is running on http://${host}:${process.env.PORT}`);
});