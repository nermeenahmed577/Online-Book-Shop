const router = require("express").Router();
const check = require("express-validator").check;

const adminController = require("../controllers/admin.controller");
const adminGuard = require("./guards/admin.guard");

router.get("/add", adminGuard, adminController.getAdd); //access to go to add-product page

module.exports = router;