const joi = require('joi')

module.exports.storyInputValidate = (body) => {
	const schema = {
		title: joi.string().required(),
		author: joi.string().required()
	}

	return joi.validate(body, schema)
}

module.exports.storyUpdateValidate = (body) => {
	if (!body.title && !body.author)
		return { error: { name: 'Validation Error', details: [ { message: 'At Least One ' } ] } }

	const schema = {
		title: joi.string().min(3),
		author: joi.string().min(3)
	}

	return joi.validate(body, schema)
}
