import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		reviewedBook: { type: Schema.Types.ObjectId, ref: "Book" },
		reviewer: { type: Schema.Types.ObjectId, ref: "Profile" },
		rating: { type: Number, min: 0, max: 5, default: 5 },
		content: String,
	},
	{
		timestamps: true,
	}
);

const Review = mongoose.model("Review", reviewSchema);

export { Review };
