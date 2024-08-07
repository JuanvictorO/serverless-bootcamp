import { randomUUID as uuid } from 'crypto'
import AWS from 'aws-sdk'
import createError from 'http-errors'
import commomMiddleware from '../lib/commomMiddleware.js'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import createAuctionSchema from '../lib/schemas/createAuctionSchema.js'

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function createAuction (event, context) {
  const { title } = event.body
  const now = new Date()
  const endDate = new Date()
  endDate.setHours(now.getHours() + 1)

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
    endingAt: endDate.toISOString(),
    highestBid: {
      amount: 0
    }
  }

  try {
    await dynamodb.put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    }).promise()
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auction)
  }
}

export const handler = commomMiddleware(createAuction)
  .use(
    validator({
      eventSchema: transpileSchema(createAuctionSchema),
      i18nEnabled: false
    })
  )