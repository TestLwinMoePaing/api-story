const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema({
	name: String,
	type: String,
	direction: String,
	context: String
})

const StorySchema = new Schema({
	title: String,
	author: String,
	messages: [ MessageSchema ]
})

const Story = mongoose.model('Story', StorySchema)

module.exports = Story
