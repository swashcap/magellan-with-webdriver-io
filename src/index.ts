import 'hard-rejection/register'

import hapi from '@hapi/hapi'
import good from '@hapi/good'

const port = 4000

const getServer = async () => {
  const server = new hapi.Server({ port })

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

  return server
}

if (require.main === module) {
  ;(async () => {
    const server = await getServer()
    await server.start()
    server.log(['server'], `Server listening on: ${server.info.uri}`)
  })()
}
