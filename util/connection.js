module.exports = (mongoose, dbURI) => {
	var db = mongoose.connection

	db.on('connecting', function() {
		console.log('connecting to MongoDB...')
	})

	db.on('error', function(error) {
		console.error('Error in MongoDb connection: ' + error)
		mongoose.disconnect()
	})

	db.on('connected', function() {
		console.log('MongoDB connected!')
	})

	db.once('open', function() {
		console.log('MongoDB connection opened!')
	})

	db.on('reconnected', function() {
		console.log('MongoDB reconnected!')
	})

	db.on('disconnected', function() {
		console.log('MongoDB disconnected!')
		mongoose.connect(dbURI, {
			auto_reconnect: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
			useFindAndModify: true
		})
	})
	mongoose.connect(dbURI, {
		auto_reconnect: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: true
	})
}
