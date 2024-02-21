const isAuthenticated = (req, res, next) => {
    console.log(req.body);
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have acess.")
    }
    next()
}

module.exports = {
    isAuthenticated
}