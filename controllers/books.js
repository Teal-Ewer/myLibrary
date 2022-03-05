import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js";
import { Review } from "../models/review.js";
import fetch from "node-fetch";

async function newBook(req, res) {
  // fetch("https://openlibrary.org/works/OL1963268W.json")
  //   .then(reso => {
  //   reso.json()
  //   })
  //   .then(data => {
  //   console.log(data)
  // })
  // res.render("books/new", {
  //   title: "Add a book",
  // });
  const response = await fetch("https://openlibrary.org/works/OL1963268W.json");
	const data = await response.text();
  res.render("books/new", {
    title: "Add a book", 
    data
  })
}

export { newBook as new };
