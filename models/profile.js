import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = new Schema(
	{
		name: String,
		avatar: String,
		recommendedBook: { type: Schema.Types.ObjectId, ref: "Book" },
		bookshelf: [{ type: Schema.Types.ObjectId, ref: "Book" }],
		availableBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
	},
	{
		timestamps: true,
	}
);

const Profile = mongoose.model("Profile", profileSchema);

export { Profile };
