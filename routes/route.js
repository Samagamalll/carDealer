const express = require("express");
const router = express.Router();
const User = require('../controllers/users');
const Car = require('../controllers/cars');
const Order = require('../controllers/orders');
const Offer = require('../controllers/offers');


const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    // if user not logged in
    // Redirect to homepage
     res.redirect('/login');
   // return res.status(400).send('You are not logged in');
};

const isAdmin = (req, res, next) => {
    //console.log("Checking")
    if (req.session.user.Type == "Admin") {
        return next();
    }
    res.redirect('/');
};


router.get("/", async function (req, res) {
    var offer = await Offer.GetLatestOffers(req, res)
    // console.log(offer)
    return res.render('home', { offers: offer, user: (req.session.user === undefined ? "" : req.session.user) });
    console.log("Rendered to homepage")
});


router.get("/login", function (req, res) {
    if (req.session.user !== undefined) {
        return res.redirect('/'); // Redirect to homepage if user is logged in
    }
    res.render('login', { error: null, user: (req.session.user === undefined ? "" : req.session.user) });
});


router.post("/login", async function (req, res) {
    try {
        console.log(`User ${req.body.email}: is logging in.`)
        var x = await User.Login(req, res)
        if (x) {
            return res.redirect('/');
        }
        return res.status(400).send('Login Fail');
    }
    catch (error) {
        return res.status(400).send('Login Fail');
    }
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get("/register", function (req, res) {
    if (req.session.user !== undefined) {
        return res.redirect('/'); // Redirect to homepage if user is logged in
    }
    res.render('register', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post("/register", function (req, res) {
    //res.render('login');
    console.log("Registering...............")
    User.AddUser(req, res);

    //console.log(req.body)
    // res.redirect('/')
});

router.post("/updateprofile", isAuthenticated, function (req, res) {
    //res.render('login');
    User.UpdateUser(req, res);
});

router.get("/profile", isAuthenticated, async function (req, res) {
    var users = await User.GetUsers(req, res);
    res.render('profile', { users: users, user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get("/dashboard", isAuthenticated, isAdmin, async function (req, res) {
    var users = await User.GetUsers(req, res);
    res.render('dashboard', { users: users, user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get("/addcar", isAuthenticated, isAdmin, function (req, res) {
    res.render('addcar', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post("/addcar", isAuthenticated, isAdmin, function (req, res) {
    Car.AddCar(req, res);
});

router.get("/cars/:name", async function (req, res) {
    var car = await Car.GetCars(req, res);
    res.render(`cars/${req.params.name}`, { cars: car, user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get("/carsedit", isAuthenticated, isAdmin, async function (req, res) {
    var car = await Car.GetCars(req, res);
    res.render('carsedit', { cars: car, user: (req.session.user === undefined ? "" : req.session.user) });

});

router.post("/carsedit", isAuthenticated, isAdmin, function (req, res) {
    Car.UpdateCar(req, res)
});


router.get("/addoffer", isAuthenticated, isAdmin, function (req, res) {
    res.render('addoffer', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post("/addoffer", isAuthenticated, isAdmin, function (req, res) {
    Offer.AddOffer(req, res);
});

router.get("/offers", async function (req, res) {
    var offers = await Offer.GetLatestOffers(req, res);
    res.render('offers', { offers: offers, user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post("/offers", isAuthenticated, isAdmin, function (req, res) {
    Offer.UpdateOffer(req, res);
    //res.render(`cars/${req.params.name}`, { user: (req.session.user === undefined ? "" : req.session.user) });
});






router.get("/orderslist", isAuthenticated, function (req, res) {
    Order.GetAllOrders(req, res)
});

router.get("/services", function (req, res) {
    res.render('services', { user: (req.session.user === undefined ? "" : req.session.user) });
});


module.exports = router;