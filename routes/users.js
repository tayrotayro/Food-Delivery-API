var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Cart = require('../models/Cart');


/* Tayro -- POST Route: create/sign up a new user */
router.post('/api/user', function (req, res) {
	const newCart = new Cart({
	})

	const newUser = new User({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		password: req.body.password,
		joinDate: Date.now(),
		currentOrders: [],
		pastOrders: [],
		cartId: newCart._id
	})

	User.find({ email: req.body.email })
		.count()
		.then(count => {
			if (count > 0) {
				res.send({
					message: "Email has already been used",
					data: null
				})
			} else {
				Promise.all([
					newUser.save(),
					newCart.save()
				])
					.then(() => {
						res.send({
							message: "User succesfully created",
							data: newUser
						});
					})
					.catch((err) => {
						res.send({
							message: err.message,
							data: null
						});
					})
			}
		})
		.catch(err => {
			res.send({
				message: err.message,
				data: null
			});
		})
});

//Get User Profile information --Taylor
router.get('/api/user/:id', function (req, res) {
	const userId = req.params.id;

	User.findById(userId)
		.select('-password')
		.then(user => {
			res.send({
				message: "Profile information retrieved",
				data: user
			})
		})
		.catch(err => {
			res.send({
				message: err.message,
				data: null
			})
		})
})

//Update user profile information --Taylor
router.put('/api/user/:id', function (req, res) {
	if (req.params.id) {
		const updatedUserInfo = {
			name: req.body.name,
			phone: req.body.phone,
			email: req.body.email
		}

		User.findByIdAndUpdate(req.params.id, { $set: updatedUserInfo })
			.then(() => {
				res.send({
					message: "Profile information updated!",
					data: null
				})
			})
			.catch(err => {
				res.send({
					message: err.message,
					data: null
				})
			})
	} else {
		res.send({
			message: "pass in valid user Id",
			data: null
		})
	}
})

// This route is for a User to become a driver

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
