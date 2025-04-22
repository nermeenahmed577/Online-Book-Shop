const authModel = require("../models/auth.model");
const validationResult = require("express-validator").validationResult;

exports.getSignup = (req, res, next) => {
    res.render("signup", {
        authError: req.flash("authError")[0],
        validationErrors: req.flash("validationErrors"),
        // isUser: false,
        // isAdmin: false,
        pageTitle: "Signup"
    });
};

//before sending the input data to the database we need to check them first
exports.postSignup = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .createNewUser(req.body.username, req.body.email, req.body.password)
            .then(() => res.redirect("/login"))
            .catch(err => {
                req.flash("authError", err);
                res.redirect("/signup");
            });
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/signup");
    }
};


