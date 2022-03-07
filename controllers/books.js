import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js";
import { Review } from "../models/review.js";
import fetch from "node-fetch";

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
	const title = book.title;
	const rating = book.averageRating;
	const authors = book.authors
		? book.authors
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
		rating: bookRating,
		description: bookDescription,
		googleURL: url,
		ownedBy: req.user.profile._id,
	})
		.then(book => {
			res.redirect("/books");
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
}

function show(req, res) {
	
}

export { index, findBook, createBook, show };
