import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js";
import { Review } from "../models/review.js";
import fetch from "node-fetch";

function index(req, res) {
	res.render("books/index", {
		title: "All Books",
	});
}

async function findBook(req, res) {
	const response = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&maxResults=2&key=${process.env.API_KEY}`
	);
  const data = await response.json();
  const book = data.items[0].volumeInfo;
	const bookTitle = book.title;
	const bookAuthor = book.authors[0];
  const bookDescription = book.description;
  const thumbnail = book.imageLinks.thumbnail;
	res.render("books/new", {
		title: "Add a book",
		bookTitle,
    bookAuthor,
    thumbnail,
    bookDescription
	});
}

export { index, findBook };
