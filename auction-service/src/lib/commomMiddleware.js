import middy from '@middy/core'
import httpEventNormalizer from '@middy/http-event-normalizer'
import httpErrorHandler from '@middy/http-error-handler'
import httpJsonBodyParser from '@middy/http-json-body-parser'

const conditionalJsonBodyParser = () => {
  return {
    before: (handler) => {
      if (handler.event.body) {
        httpJsonBodyParser().before(handler)
      }
    }
  }
}

export default handler => middy(handler)
  .use([
    conditionalJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler()
  ])