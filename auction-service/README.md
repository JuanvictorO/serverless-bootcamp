<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a simple NodeJS function running on AWS Lambda using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Auction Service

This template demonstrates how to deploy a simple NodeJS function running on AWS Lambda using the Serverless Framework. The deployed function does not include any event definitions or any kind of persistence (database). For more advanced configurations check out the [examples repo](https://github.com/serverless/examples/) which include use cases like API endpoints, workers triggered by SQS, persistence with DynamoDB, and scheduled tasks. For details about configuration of specific events, please refer to our [documentation](https://www.serverless.com/framework/docs/providers/aws/events/).

## Usage

### Configure your AWS credentials

In order to configure your AWS credentials, you need to run the following command and set the AWS Access Key ID, AWS Secret Access Key, Default region name and Default output format (json):

```
aws configure
```

### Deployment

In order to deploy the example, you need to change the field "org" in the serverless.yml file to your own org serverless account and run the following command:

```
serverless deploy
```

After running deploy, you should see output similar to:

```
endpoints:
  POST - https://2fe3xkpxr3.execute-api.us-east-2.amazonaws.com/dev/auction
  GET - https://2fe3xkpxr3.execute-api.us-east-2.amazonaws.com/dev/auctions
  GET - https://2fe3xkpxr3.execute-api.us-east-2.amazonaws.com/dev/auction/{id}
  PATCH - https://2fe3xkpxr3.execute-api.us-east-2.amazonaws.com/dev/place/{id}/bid
functions:
  createAuction: auction-service-dev-createAuction (24 MB)
  getAuctions: auction-service-dev-getAuctions (24 MB)
  getAuction: auction-service-dev-getAuction (24 MB)
  placeBid: auction-service-dev-placeBid (24 MB)
```

### Postman files to test

I left de exported postman information to test this service in the file called "auction-service-postman"
