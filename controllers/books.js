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
		`https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&maxResults=8&key=${process.env.API_KEY}`
	);
	const data = await response.json();
	res.render("books/new", {
		title: "Add a book",
		data,
	});
}

export { index, findBook };
