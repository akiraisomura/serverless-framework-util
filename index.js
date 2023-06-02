const { IncomingWebhook } = require('@slack/webhook');

class ServerlessDeployNotifier {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.hooks = {
      'before:deploy:deploy': this.beforeDeployTask.bind(this),
      'after:deploy:deploy': this.afterDeployTask.bind(this),
    };
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
    const environment = this.serverless.service.custom.environment
    const message = {
      text: text || environment.TEXT,
      channel: environment.CHANNEL,
      username: environment.USER_NAME,
      icon_emoji: environment.ICON_EMOJI,
      color: color,
    };
    const webhook = new IncomingWebhook(environment.SLACK_URL);

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
