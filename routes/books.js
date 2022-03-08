import { Router } from "express";
import * as booksCtrl from "../controllers/books.js";
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

router.get("/", booksCtrl.index);
router.get("/find", booksCtrl.findBook);
router.get("/:id/update", isLoggedIn, booksCtrl.updateOwner);
router.get("/:id", isLoggedIn, booksCtrl.show)

router.post("/:id", isLoggedIn, booksCtrl.createBook);


router.delete("/:id", isLoggedIn, booksCtrl.deleteBook);

export { router };
