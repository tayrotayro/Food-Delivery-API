var express = require('express');
var router = express.Router();
const { BaseUser, Customer, Driver, Owner} = require('../models/BaseUser');


/* Tayro -- POST Route: create/sign up a new user */
router.post('/api/user', function (req, res) {
	const newUser = new BaseUser({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		password: req.body.password
	})

	BaseUser.find({ email: req.body.email })
		.count()
		.then(count => {
			if (count > 0) {
				res.send({
					message: "Email has already been used",
					data: null
				})
			} else {
				newUser.save()
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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
