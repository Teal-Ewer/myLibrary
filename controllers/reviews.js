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
      Book.findByIdAndUpdate(review.reviewedBook).then(book => {
				book.reviews.push(review);
				book.save();
				res.redirect(`/books/${book._id}`)
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

function deleteReview(req, res) {
	Review.findByIdAndDelete(req.params.id)
		.then((review) => {
			res.redirect(`/books/${review.reviewedBook._id}`);
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

export { createReview, deleteReview as delete };
