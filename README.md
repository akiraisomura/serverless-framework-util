# serverless-framework-util


## usage
- git clone
- Please include the cloned path in the plugins section of the serverless.yml as follows.
```yaml
plugins:
  - ./serverless-framework-util/
```

- Please define the environment variables in the `.env`
```
SLACK_URL=https://hooks.slack.com/services/hoge/xxx/yyy
CHANNEL=notify
USER_NAME=LAMBDA
ICON_EMOJI=:aws-lambda:
```
