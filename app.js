const app = require('express')()
const Config = require('config')
const port = Config.get('port')
const mongoose = require('mongoose')
const glob = require('glob')

const connectDB = require('./util/connection')
connectDB(mongoose, Config.get('dbURI'))

const useMiddleware = require('./util/middleware')
useMiddleware(app)

const { ROUTE_OPTIONS } = require('./controller/routeOptionController')
app.get('/', ROUTE_OPTIONS)

let routes = glob.sync('./routes/*.js')
routes.forEach((route, i) => {
	require(route)(app)
})

// 404
app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Response Not Found' }))

// Listening
app.listen(port, () => console.log(`Story Api Server Start :${port}`))
