import { Router } from "express";
import * as reviewsCtrl from "../controllers/reviews.js";
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

router.post("/:id/new", isLoggedIn, reviewsCtrl.createReview);

router.delete("/:id", isLoggedIn, reviewsCtrl.delete)

export { router };
