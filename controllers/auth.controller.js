const authModel = require("../models/auth.model");
const validationResult = require("express-validator").validationResult;//function inside express-validator module

exports.getSignup = (req, res, next) => {
    res.render("signup", {//render signup page frontend
        authError: req.flash("authError")[0],//Gets the first authentication error message from flash storage
        validationErrors: req.flash("validationErrors"),
        isUser: false,
        isAdmin: false,
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
        req.flash("validationErrors", validationResult(req).array());//flash--> store the array of errors and to share the data into different requests
        res.redirect("/signup");
    }
};




exports.getLogin = (req,res,next) => {
    console.log();
    res.render("login" , {
        authError:req.flash('authError')[0],
        validationErrors : req.flash("validationErrors"),
        isUser : false,
        isAdmin: false
    });
};


exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .login(req.body.email, req.body.password)
            .then(result => {
                req.session.userId = result.id;
                req.session.isAdmin = result.isAdmin
                res.redirect("/");
            })
            .catch(err => {
                req.flash('authError' , err)
                res.redirect("/login");
            });
        } else {
            req.flash("validationErrors", validationResult(req).array());
            res.redirect("/login");
        }
           
};
exports.logout = (req,res,next) => {

    req.session.destroy (() => {
        res.redirect("/");
    })
}

