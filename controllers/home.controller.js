const productsModel = require("../models/products.model");

//the middelware function
exports.getHome = (req, res, next) => {

//1- Get Products
//2- Render index.ejs

    // Step 1: Extract the category from the query parameters, if provided
    let category = req.query.category
    // Step 2: Define a list of valid categories
    let validCategories = ['fiction', 'dystopian', 'science', 'classic', 'Novel', 'literature']
   // Step 3: Declare a variable to hold the promise that retrieves products
    let productsPromise
    // Step 4: Check if the category exists and is valid
    // - If valid, get products by that category
    // - If not, get all products
    if (category && validCategories.includes(category)) productsPromise = productsModel.getProductsByCategory(category)
    else productsPromise = productsModel.getAllProducts(category)
    // Step 5: Once the products are retrieved, render the 'index.ejs' template
    // - Pass the products list to the view
    productsPromise.then(products => {
        res.render('index', {
            products: products
        })
    })
};