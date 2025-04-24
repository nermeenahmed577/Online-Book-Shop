const router = require("express").Router();
const bodyParser = require("body-parser");

const authGard = require('./guards/auth.guard')

const check = require('express-validator').check

const cartController = require("../controllers/cart.controller");

router.get('/', authGard.isAuth,cartController.getCart)

router.post('/',authGard.isAuth,bodyParser.urlencoded({extended:true}),
            check('amount')
            .not()
            .isEmpty()
            .withMessage('amount is required')
            .isInt({min:1})
            .withMessage('amount must be greater than 0'),
            cartController.postCart
);

router.post('/save',
    authGard.isAuth,
    bodyParser.urlencoded({extended:true}),
    check('amount')
        .not()
        .isEmpty()
        .withMessage('amount is required')
        .isInt({min:1})
        .withMessage('amount must be greater than 0'),
    cartController.postSave

);

router.post(
    "/delete",
    authGard.isAuth,
    bodyParser.urlencoded({ extended: true }),
    cartController.postDelete
);
module.exports = router;