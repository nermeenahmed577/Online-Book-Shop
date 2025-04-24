const productsModel = require("../models/products.model");

exports.getProduct = (req, res, next) => {
    productsModel.getFirstProduct().then((product) => {
        res.render("product" , {
            product: product,
            isUser: req.session.userId !== undefined,
            error: req.query.error // Pass the error to the view
            
        })
    }).catch(err => next(err));
}

exports.getProductById = (req, res, next) => {

    let id = req.params.id
    productsModel.getProductById(id).then((product) => {
        res.render("product" , {
            product: product,
            isUser: req.session.userId !== undefined
        })
    })

};
