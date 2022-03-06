import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js";
import { Review } from "../models/review.js";
import fetch from "node-fetch";

function index(req, res) {
	res.render("books", {
		title: "All Books",
	});
}

async function findBook(req, res) {
	const response = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&maxResults=8&key=${process.env.API_KEY}`
	);
	const data = await response.json();
	res.render("books/new", {
		title: "Add a book",
		data,
	});
}

async function createBook(req, res) {
	const response = await fetch(
		`https://www.googleapis.com/books/v1/volumes/${req.params.id}?&key=${process.env.API_KEY}`
	);
	const data = await response.json();

	const book = data.volumeInfo;
	const bookId = data.id;
	const url = data.selfLink;
	const bookTitle = book.title;
	const bookRating = book.averageRating;
	const bookAuthor = book.authors
		? book.authors.join(", ")
		: "No author available";
	const bookDescription = book.description
		? book.description
		: "No description available";
	const bookCover = book.imageLinks
		? book.imageLinks.thumbnail
		: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2730&q=80";

	Book.create({
		title: bookTitle,
		authors: bookAuthor,
		bookId: bookId,
		cover: bookCover,
		description: bookDescription,
		googleURL: url,
		ownedBy: req.user.profile._id,
	})
		.then(book => {
			res.render("books", {
				title: "All books",
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

export { index, findBook, createBook };
