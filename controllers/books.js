import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js";
import { Review } from "../models/review.js";
import fetch from "node-fetch";

function index(req, res) {
	Book.find({})
		.populate("ownedBy")
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
	const bookData = data.volumeInfo;
	const bookId = data.id;
	const url = data.selfLink;
	const title = bookData.title;
	const rating = bookData.averageRating;
	const authors = bookData.authors
		? bookData.authors
		: "No author available";
	const description = bookData.description
		? bookData.description
		: "No description available";
	const cover = bookData.imageLinks
		? bookData.imageLinks.thumbnail
		: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2730&q=80";
	Book.create({
		title,
		authors,
		bookId,
		cover,
		rating,
		description,
		url,
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
	Book.findById(req.params.id)
		.populate("ownedBy")
		.then(book => {
			res.render("books/show", {
				title: book.title,
				book,
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect("/books");
		});
	
}

export { index, findBook, createBook, show };
