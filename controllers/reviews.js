import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js";
import { Review } from "../models/review.js";

function createReview(req, res) {
  Review.create()
    .then(book => {
			book.reviews.content.push(req.body.text);
			book.save();
			res.render(`books/${book._id}`, {
				title: `${book.title}`,
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

export {
  createReview
}