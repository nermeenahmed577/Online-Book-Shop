const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const DB_URL =
    "mongodb+srv://bassantehab60:o7kM0Wls0L1IFCgl@cluster0.acffgrk.mongodb.net/online_book_shop?retryWrites=true&w=majority&appName=Cluster0";

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model("user", userSchema);

// Create a new user
exports.createNewUser = (username, email, password) => {
    return mongoose
        .connect(DB_URL)
        .then(() => User.findOne({ email }))
        .then(existingUser => {
            if (existingUser) {
                mongoose.disconnect();
                throw new Error("Email is already in use");
            }
            return bcrypt.hash(password, 10);
        })
        .then(hashedPassword => {
            const user = new User({ username, email, password: hashedPassword });
            return user.save();
        })
        .then(() => {
            mongoose.disconnect();
            return "User created successfully";
        })
        .catch(err => {
            mongoose.disconnect();
            throw err;
        });
};

// User login
exports.login = (email, password) => {
    return mongoose
        .connect(DB_URL)
        .then(() => User.findOne({ email }))
        .then(user => {
            if (!user) {
                mongoose.disconnect();
                throw new Error("User not found");
            }
            return bcrypt.compare(password, user.password).then(match => {
                if (!match) {
                    mongoose.disconnect();
                    throw new Error("Invalid password");
                }
                mongoose.disconnect();
                return user._id;
            });
        })
        .catch(err => {
            mongoose.disconnect();
            throw err;
        });
};
