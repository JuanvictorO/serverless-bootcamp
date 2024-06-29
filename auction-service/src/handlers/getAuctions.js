import AWS from 'aws-sdk'
import createError from 'http-errors'
import commomMiddleware from '../lib/commomMiddleware.js'

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function getAuctions (event, context) {
  let auctions
  try {
    const result = await dynamodb.scan({
      TableName: process.env.AUCTIONS_TABLE_NAME
    }).promise()

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