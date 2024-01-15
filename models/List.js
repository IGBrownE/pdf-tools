const { LIST_USER_ROLES, UNITS_OF_MEASURE } = require('../constants')

const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true
	},
	sharedWith: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "user"
			},
			role: {
				type: String,
				default: LIST_USER_ROLES.VIEWER
			}
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	},
	lastUpdateTimeStamp: {
		type: Date,
		default: Date.now
	},
	items: [
		{
			item: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "item"
			},
			units: {
				type: String,
				enum: [...Object.values(UNITS_OF_MEASURE)],
				default: UNITS_OF_MEASURE.units
			},
			quantity: {
				type: Number,
				default: 0.0
			}
		}
	],
	dueDate: { type: Date }
});

module.exports = List = mongoose.model("list", ListSchema);
