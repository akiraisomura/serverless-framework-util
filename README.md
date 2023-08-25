# serverless-framework-util


## usage
- git clone
- Please include the cloned path in the plugins section of the serverless.yml as follows.
```yaml
plugins:
  - ./serverless-framework-util/
```

- Please define the environment variables in the `.env`
  - You need to prefix each item in the .env file with `SLS_DEPLOY_NOTIFIER_`
```
SLS_DEPLOY_NOTIFIER_SLACK_URL=https://hooks.slack.com/services/hoge/xxx/yyy
SLS_DEPLOY_NOTIFIER_CHANNEL=notify
SLS_DEPLOY_NOTIFIER_USER_NAME=LAMBDA
SLS_DEPLOY_NOTIFIER_ICON_EMOJI=:aws-lambda:
```
