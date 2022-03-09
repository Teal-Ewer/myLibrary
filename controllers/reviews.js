import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js";
import { Review } from "../models/review.js";

function createReview(req, res) {
	const reviewedBook = req.params.id;
	const reviewer = req.user.profile._id;
	const rating = req.body.rating;
	const content = req.body.content;
	Review.create({
		reviewedBook,
		reviewer,
		rating,
		content,
	})
		.then(review => {
			Book.findByIdAndUpdate(req.params._id).then(book => {
				book.reviews.push(review);
				book.save();
				res.render(`books/${book._id}`, {
					title: `${book.title}`,
				});
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

export { createReview };
