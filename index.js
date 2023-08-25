const { IncomingWebhook } = require('@slack/webhook');
require('dotenv').config();

class ServerlessDeployNotifier {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'before:deploy:deploy': this.beforeDeployTask.bind(this),
      'after:deploy:deploy': this.afterDeployTask.bind(this),
    };

    this.config = {};
    for (const key in process.env) {
      if (key.startsWith('SLS_DEPLOY_NOTIFIER_')) {
        const originalKey = key.replace('SLS_DEPLOY_NOTIFIER_', '');
        this.config[originalKey] = process.env[key];
      }
    }
  }

  beforeDeployTask() {
    const stage = this.serverless.service.provider.stage
    const functionName = this.serverless.service.serviceObject.name;
    const text = `[Lambda] "${functionName}-${stage}" deployment started.`
    this.postSlack(text, "warning")
  }
  afterDeployTask() {
    const stage = this.serverless.service.provider.stage
    const functionName = this.serverless.service.serviceObject.name;
    const text = `[Lambda] "${functionName}-${stage}" deployment finished.`
    this.postSlack(text, "good")
  }
  postSlack(text, color) {
    const { TEXT, CHANNEL, USER_NAME, ICON_EMOJI, SLACK_URL } = this.config;
    const message = {
      text: text || TEXT,
      channel: CHANNEL,
      username: USER_NAME,
      icon_emoji: ICON_EMOJI,
      color: color,
    };
    const webhook = new IncomingWebhook(SLACK_URL);

    webhook.send(message)
      .then(() => {
        console.log('Message sent!');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }
}

module.exports = ServerlessDeployNotifier;
