const mongoose = require("mongoose");

const DB_URL =
    "mongodb+srv://bassantehab60:o7kM0Wls0L1IFCgl@cluster0.acffgrk.mongodb.net/online_book_shop?retryWrites=true&w=majority&appName=Cluster0";
const orderSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    timestamp: Number,
    address: String,
    status: {
        type: String,
        default: "pending"
    },
    timestamp: Number
});

const Order = mongoose.model("order", orderSchema);

exports.getOrdersByUser = userId => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return Order.find(
                    { userId: userId },
                    {},
                    { sort: { timestamp: 1 } }
                );
            })
            .then(items => {
                mongoose.disconnect();
                resolve(items);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};
exports.addNewOrder = data => {
    return new Promise((resolve, reject) => {
        cartModel
            .deleteItem(data.cartId)
            .then(() => mongoose.connect(DB_URL))
            .then(() => {
                data.timestamp = Date.now();
                let order = new Order(data);
                return order.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.cancelOrder = id => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => Order.findByIdAndDelete(id))
            .then(() => {
                mongoose.disconnect();
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};