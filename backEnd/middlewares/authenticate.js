const authenticate = (req, res, next) => {

	if (req.session._id && req.session._id.length === 24 && req.session._id === req.cookies._gcn) {
		return next();
	} else { res.redirect("/"); }
};

module.exports = authenticate;