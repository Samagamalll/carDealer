const express = require("express");
const router = express.Router();
const Order = require('../controllers/orders');

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    // if user not logged in
    // Redirect to homepage
    res.redirect('/login');
};

router.get("/:name/:model/:price", isAuthenticated, function (req, res) {
    // console.log(req.params.name)
    // console.log(req.params.model)
    // console.log(req.params.price)
    let car = {
        Name: req.params.name,
        Model: req.params.model,
        Price: req.params.price,
    }
    req.session.car = car
    //console.log(car)
    res.render('orders', { car: car, user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post("/", isAuthenticated, function (req, res) {
    //res.render('orders', { user: (req.session.user === undefined ? "" : req.session.user) });
    Order.AddOrder(req, res);

    //res.redirect('/')
});

module.exports = router;