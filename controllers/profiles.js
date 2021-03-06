import { Profile } from "../models/profile.js";
import { Book } from "../models/book.js";
import { Review } from "../models/review.js";

function index(req, res) {
	Profile.find({})
		.then(profiles => {
			res.render("profiles/index", {
				profiles,
				title: "All Profiles",
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect(`/profiles/${req.user.profile._id}`);
		});
}

function show(req, res) {
	Profile.findById(req.params.id)
		.populate("bookshelf")
		.then(profile => {
			Profile.findById(req.user.profile._id)
				.then(self => {
				const isSelf = self._id.equals(profile._id);
				res.render("profiles/show", {
					title: `${profile.name}'s profile`,
					profile,
					self,
					isSelf,
				});
			});
		})
		.catch(err => {
			console.log(err);
			res.redirect("/");
		});
}

export { index, show };
