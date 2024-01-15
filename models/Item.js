// const { } = require('../constants')
const mongoose = require("mongoose");
const { ATTACHMENT_TYPES } = require('../constants');

const ItemSchema = new mongoose.Schema({
	listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true },
	title: { type: String, required: true },
	description: { type: String },
	dueDate: { type: Date },
	attachments: [{
		type: {
			type: String,
			enum: [...Object.values(ATTACHMENT_TYPES)], // Add more types as needed
		},
		url: { type: String },
	}],
	comments: [{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
		text: { type: String, required: true },
		createdAt: { type: Date, default: Date.now },
	}],
	checked: { type: Boolean, default: false },
	checkedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	}
});

module.exports = Item = mongoose.model("item", ItemSchema);

