const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

module.exports = (app) => {
	// Add Middlewares
	app.use(cors())
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))
	// parse application/json
	app.use(bodyParser.json())
	// Logger
	app.use(morgan('dev'))
}
