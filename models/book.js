import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema(
	{
		title: String,
		authors: [String],
		bookId: String,
		cover: String,
		publishDate: String,
		rating: Number,
		description: String,
		googleURL: String,
		ownedBy: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
		availableFrom: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
		reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
	},
	{
		timestamps: true,
	}
);

const Book = mongoose.model("Book", bookSchema);

export { Book };
