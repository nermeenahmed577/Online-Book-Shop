const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DB_URL = "mongodb+srv://bassantehab60:o7kM0Wls0L1IFCgl@cluster0.acffgrk.mongodb.net/online_book_shop?retryWrites=true&w=majority&appName=Cluster0";


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: { //object saved in database
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("user", userSchema);//mongo take user change it to lower case then add s on it

exports.createNewUser = (username, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => {//check if email exists
                return User.findOne({ email: email });
            })
            .then(user => {//user is the output from findone
                if (user) {//if exists
                    mongoose.disconnect();//disconnection of mongoose is done in resolve and reject
                    reject("email is used");
                } else {
                    return bcrypt.hash(password, 10);//10 is a string used in hashing algorithm
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
                resolve();
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};



 /* Firstly : Check Mail -- Not Found : Error
                         -- Found     : Check Password  -- Not Found : Error
                                                           Found : Set session

*/
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL)
            .then(() => User.findOne({ email: email }))
            .then(user => {
                if (!user) {
                    mongoose.disconnect();
                    reject("User Not Found");
                } else {
                    bcrypt.compare(password, user.password).then(same => {
                        if (!same) {
                            mongoose.disconnect();
                            reject("Invalid Password");
                        } else {
                            mongoose.disconnect();
                            resolve({
                                id: user._id,
                                isAdmin: user.isAdmin 
                            });
                        }
                    });
                }
            })

            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });

};