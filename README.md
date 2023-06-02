# serverless-framework-util


## usage
- git clone
- Please include the cloned path in the plugins section of the serverless.yml as follows.
```yaml
plugins:
  - ./serverless-framework-util/
  
- 
```

- Please define the environment variables in the serverless.yml
```yml
custom:
  environment:
    SLACK_URL: https://hooks.slack.com/services/hoge/xxx/yyy
    CHANNEL: ${self:custom.${opt:stage, self:provider.stage}.CHANNEL}
    USER_NAME: ''
    ICON_EMOJI: ''
    STAGE: ${opt:stage, self:provider.stage}
    TEXT: ''
  development:
    CHANNEL: '#dev'
  production:
    CHANNEL: '#prod'
```
