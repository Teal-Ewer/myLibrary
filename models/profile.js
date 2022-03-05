import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookshelfSchema = new mongoose.Schema(
	{
		books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
		availability: Boolean,
		recommendedBook: { type: Schema.Types.ObjectId, ref: "Book" },
	},
	{
		timestamps: true,
	}
);

const profileSchema = new mongoose.Schema(
	{
		name: String,
		avatar: String,
		bookshelf: [bookshelfSchema],
		reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
	},
	{
		timestamps: true,
	}
);

const Profile = mongoose.model("Profile", profileSchema);

export { Profile };
