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

const Product = mongoose.model("product", productSchema);// 2al S bttdaf 

exports.getAllProducts = () => {

  /* 1- connect to db
        2-get products
        3-disconnect
  */     
        //promise 1 ---> resolve "Called when the function  succeeds" (trigger.then)
        //promise 2 ---> reject ""called when the function fails (triggers.catch)    
     
    return new Promise((resolve, reject) => {

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
        })
        .catch(err => {
            mongoose.disconnect(reject(err));
        });
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
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
            
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