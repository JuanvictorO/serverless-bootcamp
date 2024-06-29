import { randomUUID } from 'crypto'
import AWS from 'aws-sdk'
import createError from 'http-errors'
import commomMiddleware from '../lib/commomMiddleware.js'

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function createAuction (event, context) {
  const { title } = event.body
  const now = new Date()
  const uuid = randomUUID()

  const auction = {
    id: uuid,
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
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