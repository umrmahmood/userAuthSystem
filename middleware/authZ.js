export default function isAdmin(req, res, next) {
	const { isAdmin } = req.user;
	// const {isAdmin} = req.body;
	try {
		if (!isAdmin) {
			const err = new Error("Only admins can perform this action!");
			err.status = 403;
			throw err;
		}
	} catch (err) {
		next(err);
	}
}
