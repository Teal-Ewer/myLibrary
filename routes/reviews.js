import { Router } from "express";
import * as reviewsCtrl from "../controllers/reviews.js";
import { isLoggedIn } from "../middleware/middleware.js";

const router = Router();

router.post("/:id/new", reviewsCtrl.new)

export { router };
