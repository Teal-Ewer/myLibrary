import { Profile } from "../models/profile.js"
import { Book } from "../models/book.js"
import { Review } from "../models/review.js"

function newBook(req, res) {
  console.log(req.body.params)
  res.render("books/new", {
    title: "Add a book"
  })
}

export {
  newBook as new
}