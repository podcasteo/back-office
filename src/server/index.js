/* eslint-disable no-console */
import 'babel-polyfill'
import 'isomorphic-fetch'

console.log(fetch)

import path from 'path'

import asciify from 'asciify'
import compression from 'compression'
import config from 'config'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import favicon from 'serve-favicon'

import errorsMiddleware from 'server/middlewares/errors'
import renderMiddleware from 'server/middlewares/render'

const app = express()

app.disable('x-powered-by')

app.use(cookieParser())
app.use(compression())
app.use(helmet())

app.use(favicon(path.join(__dirname, '../static/favicon.ico')))
app.use('/', express.static(path.join(__dirname, '../static')))
app.use('/bundles', express.static(path.join(__dirname, '../../dist/bundles')))

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html')
  next()
})

app.use(renderMiddleware)

app.use(errorsMiddleware)

const port = config.get('server.port')

asciify('BACK-OFFICE', {
  color: 'green',
  font: 'smslant',
}, (err, result) => {
  console.log(result.replace(/\n$/, ''))
  console.log('Back-office :::::::::::::::::::::::::::::::')
  app.listen(port, () => {
    console.log(`Server listening on ::${port}`)
  })
})
