const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');
const app = express()

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//const dbURI = "mongodb+srv://root:root@cardealership.2flb0a6.mongodb.net/?retryWrites=true&w=majority&appName=CarDealership";

const dbURI = "mongodb+srv://Sama2203286:2203286@cardealer.pqfsqyl.mongodb.net/?retryWrites=true&w=majority&appName=carDealer"; // Mongo database link

mongoose.connect(dbURI)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'ofeEWBo3297fyiuwebf@()*aBDID321',
    resave: false,
    saveUninitialized: false,
}));





const route = require("./routes/route");
const ordersRouter = require('./routes/orders');
app.use("/", route);
app.use('/orders', ordersRouter);
// app.get('/bmw.ejs', (req, res) => {
//     res.render('bmw');
// });

app.listen(3000, () => console.log("Server is running on port: " + 3000))
