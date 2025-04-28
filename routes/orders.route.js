const router = require("express").Router();

const orderController = require("../controllers/order.controller");
const authGuard = require("./guards/auth.guard");

router.get("/verify-order", authGuard.isAuth, orderController.getOrderVerify);

router.get("/orders", authGuard.isAuth, orderController.getOrder);
