import 'hard-rejection/register'

import good from '@hapi/good'
import hapi from '@hapi/hapi'
import inert from '@hapi/inert'
import path from 'path'

const port = 4000

const getServer = async () => {
  const server = new hapi.Server({ port })

  await server.register(inert)

  if (process.env.NODE_ENV !== 'test') {
    await server.register({
      options: {
        ops: {
          interval: 1000
        },
        reporters: {
          myConsoleReporter: [
            {
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*' }]
            },
            {
              module: '@hapi/good-console'
            },
            'stdout'
          ]
        }
      },
      plugin: good
    })
  }

  server.route({
    handler: {
      directory: {
        index: false,
        path: path.resolve(__dirname, '../assets'),
        redirectToSlash: true
      }
    },
    method: 'GET',
    path: '/assets/{param*}'
  })

  return server
}

if (require.main === module) {
  ;(async () => {
    const server = await getServer()
    await server.start()
    server.log(['server'], `Server listening on: ${server.info.uri}`)
  })()
}
