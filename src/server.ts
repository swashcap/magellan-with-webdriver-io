import 'hard-rejection/register'

import ejs from 'ejs'
import good from '@hapi/good'
import hapi from '@hapi/hapi'
import inert from '@hapi/inert'
import path from 'path'
import vision from '@hapi/vision'

const port = 4000

const getServer = async () => {
  const server = new hapi.Server({ port })

  await server.register([inert, vision])

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

  server.views({
    context: {
      htmlWebpackPlugin: {
        files: {},
        options: {
          appMountId: 'app',
          links: [
            'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
          ],
          scripts: ['/dist/bundle.js'],
          title: 'Magellan with WebdriverIO'
        }
      }
    },
    engines: { ejs },
    isCached: process.env.NODE_ENV === 'production',
    path: path.resolve(__dirname, '../node_modules/html-webpack-template')
  })
  server.route({
    handler: {
      view: 'index'
    },
    method: 'GET',
    path: '/'
  })

  server.route({
    handler: {
      directory: {
        index: false,
        path: path.resolve(__dirname, '../dist'),
        redirectToSlash: true
      }
    },
    method: 'GET',
    path: '/dist/{param*}'
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
