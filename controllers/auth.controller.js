const authModel = require("../models/auth.model.js");
const validationResult = require("express-validator").validationResult;

exports.getLogin = (req,res,next) => {
    console.log();
    res.render("login" , {
        authError:req.flash('authError')[0]
    });
};


exports.postLogin = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel
            .login(req.body.email, req.body.password)
            .then(id => {
                req.session.userId = id;
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