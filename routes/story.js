const router = require('express').Router()
const {
	GET_STORY,
	CREATE_STORY,
	GET_ONE_STORY,
	UPDATE_STORY,
	DELETE_ONE_STORY,
	DELETE_ALL_STORIES
} = require('../controller/storyController')

router.get('/', GET_STORY)

router.post('/', CREATE_STORY)

router.delete('/', DELETE_ALL_STORIES)

router.get('/:id', GET_ONE_STORY)

router.put('/:id', UPDATE_STORY)

router.patch('/:id', UPDATE_STORY)

router.delete('/:id', DELETE_ONE_STORY)

module.exports = (app) => {
	app.use('/story', router)
}
