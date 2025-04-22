const express = require("express");
const path = require("path");
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const homeRouter = require('./routes/home.route')
const authRouter = require("./routes/auth.route");
const app = express();

app.use (express.static(path.join(__dirname,'assets')))
app.use (express.static(path.join(__dirname,'images')))
app.use(flash());

const STORE = new SessionStore({
    uri:
        "mongodb+srv://bassantehab60:o7kM0Wls0L1IFCgl@cluster0.acffgrk.mongodb.net/online_book_shop?retryWrites=true&w=majority&appName=Cluster0",
    collection: "sessions"
});

app.use(
    session({
        secret: "this is my secret secret to hash express sessions ......",
        saveUninitialized: false,
        store: STORE
    })
);


app.set('view engine','ejs')
app.set('views','views')

app.use('/',homeRouter)
app.use('/',authRouter)

app.listen(3000, () => {
    console.log("server listen on port 3000 " )
})