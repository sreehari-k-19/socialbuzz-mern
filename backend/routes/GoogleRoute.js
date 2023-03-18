import express from "express";
import passport from 'passport';
import UserModel from "../models/userModels.js";
import '../passport.js'
const router = express.Router()

router.get("/login/success", (req, res) => {
	console.log("login sucss", req.user)
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	console.log("loginFailed")
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect:"login/success",
// 		failureRedirect: "/login/failed",
// 	})
// );
router.get('/google/callback',
	passport.authenticate('google', { failureRedirect: '/login/failed' }),
	async function (req, res) {
		const { id, name, emails } = req.user
		console.log("<<<<<.>>>>>>", name.givenName, name.familyName, emails[0].value)
		// res.redirect("login/success");
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
		// const user = await UserModel.findOne({ username: emails.value })
		// if (user) {

		// } else {
		// 	const newUser = await UserModel({
		// 		firtname: name.givenName,
		// 		lastname: name.familyName,
		// 		username: emails[0].value,
		// 	})
		// 	user = await newUser.save()
		// }
		// res.redirect('http://localhost:3000');
	});

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

export default router;