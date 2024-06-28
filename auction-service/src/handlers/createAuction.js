import { randomUUID } from 'crypto'
import AWS from 'aws-sdk'

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function createAuction (event, context) {
  const { title } = JSON.parse(event.body)
  const now = new Date()
  const uuid = randomUUID()

  const auction = {
    id: uuid,
    title,
    status: 'OPEN',
    createdAt: now.toISOString()
  }

  await dynamodb.put({
    TableName: 'AuctionsTable',
    Item: auction,
  }).promise()

  return {
    statusCode: 201,
    body: JSON.stringify(auction)
  }
}

export const handler = createAuction