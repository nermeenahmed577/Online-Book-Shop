const authModel = require("../models/auth.model.js");


exports.getLogin = (req,res,next) => {
    res.render("login");
};


exports.postLogin = (req, res, next) => {
        authModel
            .login(req.body.email, req.body.password)
            .then(id => {
                req.session.userId = id;
                res.redirect("/");
            })
            .catch(err => {
                console.log(err);
                res.redirect("/login");
            });
           
};
exports.logout = (req,res,next) => {

    req.session.destroy (() => {
        res.redirect("/");
    })
}