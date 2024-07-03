import AWS from 'aws-sdk'
import createError from 'http-errors'
import commomMiddleware from '../lib/commomMiddleware.js'
import { getAuctionById } from './getAuction.js'
import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'
import placeBidSchema from '../lib/schemas/placeBidSchema.js'

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function placeBid (event, context) {
  const { id } = event.pathParameters
  const { amount } = event.body;

  const auction = await getAuctionById(id)

  if (auction.status === "CLOSED") {
    throw new createError.Forbidden(`You cannot bid on closed auctions!`)
  }

  if (amount <= auction.highestBid.amount) {
    throw new createError.Forbidden(`Your bid must be higher than ${auction.highestBid.amount}`)
  }

  const params = {
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Key: { id },
    UpdateExpression: 'set highestBid.amount = :amount',
    ExpressionAttributeValues: {
      ':amount': amount
    },
    ReturnValues: 'ALL_NEW'
  }

  let updatedAuction
  try {
    const result = await dynamodb.update(params).promise()
    updatedAuction = result.Attributes
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify(updatedAuction)
  }
}

export const handler = commomMiddleware(placeBid)
  .use(
    validator({
      eventSchema: transpileSchema(placeBidSchema),
      i18nEnabled: false
    })
  )