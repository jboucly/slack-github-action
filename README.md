```bash
 __          __  _     _                 _       _____ _ _   _           _                    _   _
 \ \        / / | |   | |               | |     / ____(_) | | |         | |         /\       | | (_)
  \ \  /\  / /__| |__ | |__   ___   ___ | | __ | |  __ _| |_| |__  _   _| |__      /  \   ___| |_ _  ___  _ __  ___
   \ \/  \/ / _ \ '_ \| '_ \ / _ \ / _ \| |/ / | | |_ | | __| '_ \| | | | '_ \    / /\ \ / __| __| |/ _ \| '_ \/ __|
    \  /\  /  __/ |_) | | | | (_) | (_) |   <  | |__| | | |_| | | | |_| | |_) |  / ____ \ (__| |_| | (_) | | | \__ \
     \/  \/ \___|_.__/|_| |_|\___/ \___/|_|\_\  \_____|_|\__|_| |_|\__,_|_.__/  /_/    \_\___|\__|_|\___/|_| |_|___/
```

<p align="center">
  <img src="https://img.shields.io/static/v1?style=for-the-badge&color=green&logoColor=white&logo=slack&label=slack&message=webhook" alt="slack" />
  <img src="https://img.shields.io/static/v1?style=for-the-badge&color=7289DA&logoColor=white&logo=discord&label=discord&message=webhook" alt="discord" />
</p>

## Description

Webhook to send notification in slack / discord when github action run/completed/failed.

## How to use ? ℹ️

An HTTP server runs and listens permanently on certain pre-defined routes (see routes), when an event coming from github is emitted the server receives the information and processes it to send a notification to Slack or to Discord (depending on the road).

### Setting up a server

Fork the repository and deploy it on a server such as [Heroku](https://www.heroku.com/), [Deta](https://web.deta.sh/) or other.

### Setting up a webhook on a github repository

Go to the repository settings webhook section and click on `Add webhook` :

<img style="text-align: center" src="https://github.com/jboucly/webhook-github-action/blob/main/src/public/images/webhooks.png" /><br>

Once on the interface add the url of the webhook of your server on which this application is located with the correct route for either Discord or Slack (see Routes).
Select `Content-Type: application/json`
As well as emit individual events and choose `Check runs`

Then validate.

<img style="text-align: center" src="https://github.com/jboucly/webhook-github-action/blob/main/src/public/images/add-webhook.png" /><br>

### Routes

For Slack :

`/github-actions/slack`

For Discord :

`/github-actions/discord`

## Development 👨‍💻

### Installation

```bash
$ npm i
```

### Run dev mode

```bash
$ npm run start:dev
```

### Run prod mode

```bash
$ npm run start
```
