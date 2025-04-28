// Import the Express framework
const express = require("express"); 

// Import the built-in 'path' module to handle and transform file paths
const path = require("path");

// Import route handlers for different URL paths
const homeRouter = require('./routes/home.route')          // Handles routes for the home page
const productRouter = require('./routes/product.route')    // Handles routes for product-related pages

// Create an instance of an Express application
const app = express();

// Serve static files from the 'assets' directory
app.use(express.static(path.join(__dirname, 'assets')));

// Serve static files from the 'images' directory
app.use(express.static(path.join(__dirname, 'images')));

// Set the view engine to 'ejs' for rendering dynamic pages
app.set('view engine', 'ejs');

// Set the directory where the view templates are located
app.set('views', 'views');

// Use the homeRouter for all requests to the root URL '/'
app.use('/', homeRouter);

// Use the productRouter for all requests to URLs starting with '/product'
app.use("/product", productRouter);

// Start the server and listen on port 3000
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log("Listening on port ${port}..."));
