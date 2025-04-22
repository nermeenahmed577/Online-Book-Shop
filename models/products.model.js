const mongoose = require("mongoose");
const DB_URL = 'mongodb://localhost:27017/Online_Book_Shop';
const productSchema = mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    category: String,
    image: String,
    description: String
});

const Product = mongoose.model("product", productSchema);

exports.getAllProducts = () => {
    return new Promise((resolve, reject) => {

        //connect to db
        //get products
        //disconnect
        
        mongoose.connect(DB_URL).then(() => {
            return Product.find({});
        }).then(products => {
            mongoose.disconnect();
            resolve(products);
        })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getProductsByCategory = (category)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find({category:category})
        }).then(products =>{
            mongoose.disconnect()
            resolve(products)
        }).catch(err=>reject(err))
    })
}