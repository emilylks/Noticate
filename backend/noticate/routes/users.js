var express = require('express');
var router = express.Router();
const db = require('./../db/db.js');
const User = db.User;

// Add friend to friends list
router.post('/', newUser); 
router.post('/friends', addFriend);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

function newUser(req, res, next) {
	createUser(req.body)
		.then(success => res.json(success))
}

function addFriend(req, res, next) {
	insertFriend(req.body)
		.then(success => res.json(success))
}


// Helper functions
const createUser = async (userParams) => {
	try {
		const user = new User(userParams);
		user.save();
		return({msg: 'Success'});
	}
	catch (error) {
		return ({msg: 'Could not create new user'});
	}
}

const insertFriend = async (params) => {
	try {
		let user = await User.findOne({ userId: params.userId }); 
		if (user === null)
			throw 'User Not Found';
		user.friends.push(params.newfriendId);	
		return ({msg: "Success"});
	}
	catch (error) {
		return ({msg: 'Could not add new friend'});
	}
}

module.exports = router;
