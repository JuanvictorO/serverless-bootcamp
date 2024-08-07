import AWS from 'aws-sdk'
import createError from 'http-errors'
import commomMiddleware from '../lib/commomMiddleware.js'
import getAuctionsSchema from '../lib/schemas/getAuctionsSchema.js'
import { transpileSchema } from '@middy/validator/transpile'
import validator from '@middy/validator'

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function getAuctions (event, context) {
  const { status } = event.queryStringParameters
  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    IndexName: 'statusAndEndDate',
    KeyConditionExpression: '#status = :status',
    ExpressionAttributeValues: {
      ':status': status
    },
    ExpressionAttributeNames: {
      '#status': 'status'
    }
  }

  let auctions
  try {
    const result = await dynamodb.query(params).promise()

    auctions = result.Items
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions)
  }
}

export const handler = commomMiddleware(getAuctions)
  .use(
    validator({
      eventSchema: transpileSchema(getAuctionsSchema),
      i18nEnabled: false
    })
  )