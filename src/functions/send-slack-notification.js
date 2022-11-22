var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const sendSlackNotification = async (githubData) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.WEBHOOK_URL, true);
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
                message: "Une pipeline vient d'être lancée",
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
};

exports.sendSlackNotification = sendSlackNotification;
