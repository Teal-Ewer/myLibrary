import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema(
	{
		title: String,
		author: String,
		reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
	},
	{
		timestamps: true,
	}
);

const Book = mongoose.model("Book", bookSchema);

export { Book };
