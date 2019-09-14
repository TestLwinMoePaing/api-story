const ROUTE_OPTIONS = (req, res) => {
	const url = req.protocol + '://' + req.get('host')
	const data = {
		currentRoute: '/',
		routes: [
			{
				uri: `${url}/story`,
				method: 'GET',
				description: 'Get All Stories'
			},
			{
				uri: `${url}/story`,
				method: 'POST',
				description: 'Create Story'
			},
			{
				uri: `${url}/story/{id}`,
				method: 'GET',
				description: 'Get Specific Story'
			},
			{
				uri: `${url}/story/{id}`,
				method: 'PUT/PATCH',
				description: 'Update Specific Story'
			},
			{
				uri: `${url}/story/{id}`,
				method: 'DELETE',
				description: 'DELETE Specific Story'
			},
			{
				uri: `${url}/story`,
				method: 'DELETE',
				description: 'DELETE ALL Stories'
			}
		]
	}

	return res.json(data, 200)
}

module.exports.ROUTE_OPTIONS = ROUTE_OPTIONS
