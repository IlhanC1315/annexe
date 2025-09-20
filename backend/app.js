const express = require('express');
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const configurePassport = require('./config/passport')

const app = express();

connectDB();

//middlewares
app.use(cors());
app.use(express.json());

//initialise passport avec la config
app.use(passport.initialize());
configurePassport();

//routes
app.use("/api/auth", authRoutes);

//route test
app.get('/', (req, res) => {
    res.send("API WashGo fonctionne ✅");
});

module.exports = app;