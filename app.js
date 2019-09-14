const app = require('express')()
const mongoose = require('mongoose')
const Config = require('config')
const glob = require('glob')

const connectDB = require('./util/connection')
connectDB(mongoose, Config.get('dbURI'))

const useMiddleware = require('./util/middleware')
useMiddleware(app)

const { ROUTE_OPTIONS } = require('./controller/routeOptionController')
app.get('/', ROUTE_OPTIONS)

// routes
let routes = glob.sync('./routes/*.js')
routes.forEach((route, i) => {
	require(route)(app)
})

// 404
app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Response Not Found' }))

module.exports = app
