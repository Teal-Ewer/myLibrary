import { Profile } from "../models/profile.js";

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
	
}

export {
	index, 
	show
}