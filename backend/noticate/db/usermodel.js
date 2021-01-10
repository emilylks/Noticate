const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	userId: {type: String, unique: true, required: true},
	friends: [{ friendId: String}],
	files: [{ filename: String, url: String, tags: [{type: String}] }]
});

userSchema.set('toJSON', {
	virtuals: true,
	versionKey: false,
	transform: function (doc, ret) {
		delete ret._id;
		delete ret.hash;
	}
});

module.exports = mongoose.model('User', userSchema);
