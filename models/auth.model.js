const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DB_URL =
    "mongodb+srv://marimreda777:159357M_R@cluster0.dofpptg.mongodb.net/online-book?retryWrites=true&w=majority&appName=Cluster0";
const userSchema = mongoose.Schema({
  
    username: String,
    email: String,
    password: String,
    // isAdmin: {
    //     type: Boolean,
    //     default: false
    // }

});

const User = mongoose.model("user", userSchema);

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
                            reject(new Error("Invalid Password"));
                        } else {
                            mongoose.disconnect();
                            resolve(user._id);
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