//require dotenv to import .env file its always will on top
require("dotenv").config();

//requires express and Initialize the express app
const express = require("express");
const app = express();

//difine the port
const port = process.env.PORT || 8000;

// require mongoose to Connect with the database
const mongoose = require("mongoose");

if(process.env.NODE_ENV == "development") {
    mongoose.connect(process.env.MONGO_DEV_URI)
        .then(() => { console.log('Connected to development db') })
        .catch((errer) => { console.log(errer) });
} else if(process.env.NODE_ENV == "production") {
    mongoose.connect(process.env.MONGO_PROD_URI)
        .then(() => { console.log('Connected to production db') })
        .catch((errer) => { console.log(errer) });
}
else {
    console.log('Testing Mongo DB connected');
}

// Entry route
app.get("/", (req,res) => {
    console.log("JSM")
    res.send("Welcome")
})

//reuire express.json to get obj to json
app.use(express.json());

// product route
const productRoute = require("./routes/productRoute");
app.use("/products", productRoute);

// auth route
const authRoute = require("./routes/authRoute");
app.use('/users', authRoute);

app.listen(port, () => {
    console.log(`listing server port: ${port}`)
})