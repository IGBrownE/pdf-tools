const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		default: 'avatar.png'
	},
	dateOfBirth: {
		type: Date
	},
	isGuest: {
		type: Boolean,
		default: true
	}
});

module.exports = User = mongoose.models.user || mongoose.model("user", UserSchema);
