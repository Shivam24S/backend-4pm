import HttpError from "./HttpError.js";

const checkAuth = (req, res, next) => {
    try {
        if (!req.user) {
            res.redirect("/");
        }

        next();
    } catch (error) {
        next(new HttpError(error.message, 5000));
    }
};


export default checkAuth