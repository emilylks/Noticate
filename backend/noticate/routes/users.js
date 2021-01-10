var express = require('express');
var router = express.Router();
const db = require('./../db/db.js');
const User = db.User;

// Add friend to friends list
router.get('/', getUsers);
router.post('/', newUser); 
router.post('/friends', addFriend);

function getUsers(req, res, next) {
	returnUsers(req.body)
		.then(users => {res.json(users)})
}

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

const returnUsers = async (params) => {
	console.log("Trying to retrieve users");
	try {
//		let users = await User.find({}, {userId:1, friends:0, files:0});
		let users = await User.find({}, {userId:1, _id:0});
		console.log(users);
		return ({users: users, status: 200, msg: "Retrieved users successfully"});
	}
	catch (error) {
		return {msg: "Failed to get users"};
	}
}

module.exports = router;
