const fastify = require('fastify')({
  logger: true
})
const path = require('path')
const fs = require('fs')

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, '../client/dist')
})
const { getIcecastStatus, getIcecastJson } = require('./components/getters')

// Declare a route
fastify.get('/api/', async function (request, reply) {
  const data = await getIcecastStatus()
  reply.send(data)
})
fastify.get('/', async function (request, reply) {
  const stream = fs.createReadStream(path.join('../client/dist', 'index.html'))
  reply.type('text/html').send(stream)
})
fastify.get('/api/json', async function (request, reply) {
  const data = await getIcecastJson()
  reply.send(data)
})

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
