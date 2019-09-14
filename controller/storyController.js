// Model
const Story = require('../model/Story')
// Validation
const { storyInputValidate, storyUpdateValidate } = require('../validation/storyValidate')
// Util
const { messageGenerator } = require('../util/messageGenerator')

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @description Get All Stories
 * @returns Story Json
 */
const GET_STORY = async (req, res) => {
	try {
		const stories = await Story.find({}, { title: 1, author: 1 }).sort({ _id: -1 })
		const localUrl = getLocalUri(req)
		const data = stories.map((story) => getAllStoryFormat(story, `${localUrl}/story/${story._id}`))
		res.status(200).json({ data })
	} catch (err) {
		res.status(500).json({ error: err, code: 500 })
	}
}

module.exports.GET_STORY = GET_STORY

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @description Create One Story
 * @return Create Story Json
 */
const CREATE_STORY = async (req, res) => {
	const { body } = req
	const { error } = storyInputValidate(body)
	if (error) return res.status(400).json({ error, code: 400 })

	try {
		body.messages = messageGenerator()
		const newStory = new Story(body)
		const data = await newStory.save()
		res.status(200).json({
			data,
			success: true
		})
	} catch (err) {
		res.status(500).json({ error: err, code: 500 })
	}
}

module.exports.CREATE_STORY = CREATE_STORY

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @description Create One Story
 * @return Create Story Json
 */
const DELETE_ALL_STORIES = async (req, res) => {
	try {
		const data = await Story.remove()
		res.status(200).json({
			data,
			success: true
		})
	} catch (err) {
		res.status(500).json({ error: err, code: 500 })
	}
}

module.exports.DELETE_ALL_STORIES = DELETE_ALL_STORIES

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @description Get Specific Story
 * @returns Get One Story Json
 */
const GET_ONE_STORY = async (req, res) => {
	try {
		const { id } = req.params
		const story = await Story.findById(id, { title: 1, author: 1, messages: 1 })
		const data = getOneStoryFormat(story, `${getLocalUri(req)}/story`)
		res.status(200).json({ data })
	} catch (err) {
		res.status(500).json({ error: err, code: 500 })
	}
}

module.exports.GET_ONE_STORY = GET_ONE_STORY

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @description UPDATE One Story
 * @return UPDATE Story Json
 */
const UPDATE_STORY = async (req, res) => {
	const { body } = req

	const { error } = storyUpdateValidate(body)
	if (error) return res.status(400).json({ error, code: 400 })

	try {
		const { id } = req.params
		const result = await Story.findByIdAndUpdate(id, body)
		const data = await Story.findById(id)
		res.status(200).json({
			success: true,
			data
		})
	} catch (err) {
		res.status(500).json({ error: err, code: 500 })
	}
}

module.exports.UPDATE_STORY = UPDATE_STORY

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @description DELETE Specific Story
 * @returns DELETE One Story Json
 */
const DELETE_ONE_STORY = async (req, res) => {
	try {
		const { id } = req.params
		const data = await Story.findByIdAndDelete(id)
		res.status(200).json({ data, success: true })
	} catch (err) {
		res.status(500).json({ error: err, code: 500 })
	}
}

module.exports.DELETE_ONE_STORY = DELETE_ONE_STORY

// All Helper
const getLocalUri = (req) => (req.secure ? 'https' : req.protocol) + '://' + req.get('host')

const getAllStoryFormat = (story, uri) => {
	return {
		_id: story._id,
		title: story.title,
		author: story.author,
		next: {
			uri,
			method: 'GET',
			description: `See Detail ${story.title}`
		}
	}
}

const getOneStoryFormat = (story, uri) => {
	return {
		...story._doc,
		next: {
			uri,
			method: 'GET',
			description: 'See List All Stories'
		}
	}
}
