var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const sendDiscordNotifications = async (githubData) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', process.env.WEBHOOK_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const githubRepoName = githubData.repository.name;
    const githubActionStatus = githubData.check_run.status;
    const githubActionConclusion = githubData.check_run.conclusion;

    let body = {
        embeds: [
            {
                url: githubData.check_run.html_url,
                author: {
                    name: githubRepoName,
                    url: githubData.repository.url,
                    icon_url: process.env.DISCORD_ICON_URL,
                },
            },
        ],
        attachments: [],
        content: 'Notification CI/CD',
    };

    switch (githubActionStatus) {
        case 'queued':
            body.embeds[0].color = 818938;
            body.embeds[0].timestamp = githubData.check_run.started_at;
            body.embeds[0].title = "🔄 Une pipeline vient d'être lancée 🔄";
            break;

        case 'completed':
            body.embeds[0].timestamp = githubData.check_run.completed_at;

            if (githubActionConclusion === 'success') {
                body.embeds[0].color = 1376000;
                body.embeds[0].title = '✅ Pipeline complété avec succès ✅';
            } else if (githubActionConclusion === 'failure') {
                body.embeds[0].color = 16711680;
                body.embeds[0].title = '❌ Pipeline fail ❌';
            }
            break;
    }

    if (body) xhr.send(JSON.stringify(body));
};

exports.sendDiscordNotifications = sendDiscordNotifications;
