import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js";
import { Review } from "../models/review.js";
import fetch from "node-fetch";
import striptags from "striptags";

function index(req, res) {
	Book.find({})
		.then(books => {
			res.render("books/index", {
				title: "All Books",
				books,
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

async function findBook(req, res) {
	const response = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&maxResults=12&key=${process.env.API_KEY}`
	);
	const data = await response.json();
	const bookIds = [];
	const dbBooks = [];
	data.items.forEach(item => {
		bookIds.push(item.id);
	});
	Book.find({})
		.then(books => {
			books.forEach(book => {
				if (bookIds.includes(book.bookId)) {
					dbBooks.push(book);
					data.items.splice(data.items[book.bookId], 1);
				}
			});
			res.render("books/new", {
				title: "Add a book",
				data,
				dbBooks,
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

async function createBook(req, res) {
	const response = await fetch(
		`https://www.googleapis.com/books/v1/volumes/${req.params.id}?&key=${process.env.API_KEY}`
	);
	const data = await response.json();
	const bookData = data.volumeInfo;
	const bookId = data.id;
	const url = data.selfLink;
	const title = bookData.title;
	const publishDate = bookData.publishedDate;
	const rating = bookData.averageRating;
	const authors = bookData.authors ? bookData.authors : "No author available";
	const description = bookData.description
		? striptags(bookData.description)
		: "No description available";
	const cover = bookData.imageLinks
		? bookData.imageLinks.thumbnail
		: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2730&q=80";
	Book.create({
		title,
		authors,
		bookId,
		publishDate,
		cover,
		rating,
		description,
		url,
		ownedBy: req.user.profile._id,
		availableFrom: req.user.profile._id,
	})
		.then(book => {
			Profile.findByIdAndUpdate(req.user.profile._id).then(profile => {
				profile.bookshelf.push(book);
				profile.availableBooks.push(book);
				profile.save().then(() => res.redirect("/books"));
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

function show(req, res) {
	Book.findById(req.params.id)
		.populate([{
			path: "reviews",
			populate: {
				path: "reviewer"
			},
		},
			{
				path: "availableFrom"
			}])
		.then(book => {
					res.render("books/show", {
						title: book.title,
						book,
					})
				})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

function deleteBook(req, res) {
	Book.findById(req.params.id)
		.then(book => {
			if (book.ownedBy.length === 1) {
				Book.findByIdAndDelete(book._id).then(() => {
					Profile.findByIdAndUpdate(req.user.profile._id).then(profile => {
						profile.bookshelf.remove({ _id: book._id });
						profile.availableBooks.remove({ _id: book._id });
						profile.save().then(() => res.redirect("/books"));
					});
				});
			} else {
				Book.findByIdAndUpdate(book._id).then(book => {
					book.ownedBy.remove({ _id: req.user.profile._id });
					book.availableFrom.remove({ _id: req.user.profile._id });
					book.save().then(book => {
						Profile.findByIdAndUpdate(req.user.profile._id).then(profile => {
							profile.bookshelf.remove({ _id: book._id });
							profile.availableBooks.remove({ _id: book._id });
							profile.save().then(() => res.redirect("/books"));
						});
					});
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

function updateOwner(req, res) {
	Book.findByIdAndUpdate(req.params.id)
		.then(book => {
			book.ownedBy.push(req.user.profile._id);
			book.availableFrom.push(req.user.profile._id);
			book.save().then(book => {
				Profile.findByIdAndUpdate(req.user.profile._id).then(profile => {
					profile.bookshelf.push(book);
					profile.availableBooks.push(book);
					profile.save().then(() => res.redirect("/books"));
				});
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

function updateAvailability(req, res) {
	Book.findByIdAndUpdate(req.params.id)
		.then(book => {
			book.availableFrom.includes(req.user.profile._id)
				? book.availableFrom.remove(req.user.profile._id)
				: book.availableFrom.push(req.user.profile._id);
			book.save().then(book => {
				Profile.findByIdAndUpdate(req.user.profile._id).then(profile => {
					profile.availableBooks.includes(book._id)
						? profile.availableBooks.remove(book)
						: profile.availableBooks.push(book);
					profile.save().then(() => res.redirect(`/books/${book._id}`))
				})
			})
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

export {
	index,
	findBook,
	createBook,
	show,
	deleteBook,
	updateOwner,
	updateAvailability,
};
