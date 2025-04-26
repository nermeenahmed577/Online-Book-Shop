const mongoose = require("mongoose");

const DB_URL = 'mongodb+srv://bassantehab60:o7kM0Wls0L1IFCgl@cluster0.acffgrk.mongodb.net/online_book_shop?retryWrites=true&w=majority&appName=Cluster0';

const productSchema = mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    category: String,
    image: String,
    description: String
});

const Product = mongoose.model("product", productSchema);

exports.addNewProduct = data => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                let newProduct = new Product(data);
                return newProduct.save();
            })
            .then(products => {
                mongoose.disconnect();
                resolve(products);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};


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

exports.getProductById = (id) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.findById(id);
            })
            .then(product => {
                mongoose.disconnect();
                resolve(product);
            })
            .catch(err => reject(err));
            
    });
};
exports.getFirstProduct = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Product.findOne({});
            })
            .then(product => {
                mongoose.disconnect();
                resolve(product);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};