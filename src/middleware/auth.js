const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '')
		const decoded = await jwt.verify(token, "This is manar")
		const user = await User.findById({ _id: decoded._id })
		if (!user) {
			throw new Error()
		}
		req.user = user
		req.token = token

		next()
	} catch (e) {
		res.status(401).send("Please authenticate.")
	}
}

module.exports = auth