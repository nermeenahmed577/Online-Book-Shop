const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;



const authController = require("../controllers/auth.controller");


router.get("/signup",authController.getSignup);
router.post(
    "/signup",
    // authGuard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check("username")
        .not().isEmpty().withMessage("username is required"),
    check("email")
        .not().isEmpty().withMessage("email is required")
        .isEmail().withMessage("invalid format for email"),
    check("password")
        .not().isEmpty().withMessage("password is required")
        .isLength({ min: 6 }).withMessage("password must be at least 6 characters"),
    check("confirmPassword").custom((value, { req }) => {
        if (value === req.body.password) return true;
        else throw "passwords aren't equal";
    }),
    authController.postSignup
);




module.exports = router;