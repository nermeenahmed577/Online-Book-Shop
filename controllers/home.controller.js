const productsModel = require("../models/products.model");

exports.getHome = (req, res, next) => {
   productsModel.getAllProducts()
        .then(products => {
            res.render("index", {
                products: products,

            });
        })
};