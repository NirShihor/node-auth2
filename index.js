const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user")//imports the user registration from routes/user.js
const InitiateMongoServer = require("./config/db");
const User = require("./model/User")//imports the User.js with the Schema


//initiate Mongo Server
InitiateMongoServer();

const app = express();

app.set("view engine", "ejs");

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function (req, res) {
    res.render("home");
    //res.json({ message: "API Working" });
});

// Router Middleware
// Router - /user/
// Method
app.use("/user", user);

app.post("/node-auth2", function (req, res) {
    var nameOne = req.body.name;
    var emailOne = req.body.email;
    var passwordOne = req.body.password;

    const user = new User({
        username: nameOne,
        email: emailOne,
        password: passwordOne
    });

    user.save();
    res.redirect("/");
});

app.listen(PORT, function (req, res) {
    console.log(`Server Started at PORT ${PORT}`);
});