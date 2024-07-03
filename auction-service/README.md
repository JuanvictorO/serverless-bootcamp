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
yarn serverless deploy
```

After running deploy, you should see output similar to:

```
endpoints:
  POST - http://your-base-url/dev/auction
  GET - http://your-base-url/dev/auctions
  GET - http://your-base-url/dev/auction/{id}
  PATCH - http://your-base-url/dev/place/{id}/bid
functions:
  createAuction: auction-service-dev-createAuction
  getAuctions: auction-service-dev-getAuctions
  getAuction: auction-service-dev-getAuction
  placeBid: auction-service-dev-placeBid
  processAuctions: auction-service-dev-processAuctions
```

### Postman files to test

I left de exported postman information to test this service in the file called "auction-service-postman"
