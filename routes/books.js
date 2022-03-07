import { Router } from "express";
import * as booksCtrl from "../controllers/books.js";
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

router.get("/", booksCtrl.index);
router.get("/find", booksCtrl.findBook);
router.get("/:id", isLoggedIn, booksCtrl.show)

router.post("/:id", isLoggedIn, booksCtrl.createBook);

export { router };
