const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;


const authController = require ("../controllers/auth.controller");

router.get("/login",authController.getLogin);

router.post(
    "/login",
    bodyParser.urlencoded({extended: true}),
    check("email")
        .not()
        .isEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid format"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 charachters"),  
        
    authController.postLogin
);

router.all('/logout',authController.logout)

module.exports = router;