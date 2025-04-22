const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const DB_URL =
    "mongodb+srv://bassantehab60:o7kM0Wls0L1IFCgl@cluster0.acffgrk.mongodb.net/online_book_shop?retryWrites=true&w=majority&appName=Cluster0";
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("user", userSchema);

exports.createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {
                return User.findOne({ email: email });
            })
            .then(user => {//user is the return from findone
                if (user) {
                    mongoose.disconnect();
                    reject("email is used");
                } else {
                    return bcrypt.hash(password, 10);
                }
            })
            .then(hashedPassword => {
                let user = new User({
                    username: username,
                    email: email,
                    password: hashedPassword
                });
                return user.save();
            })
            .then(() => {
                mongoose.disconnect();
                resolve("user created successfully");
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};
