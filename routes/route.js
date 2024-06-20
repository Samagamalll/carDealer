const express = require("express");
const router = express.Router();
const User = require('../controllers/users');
const Car = require('../controllers/cars');
const Order = require('../controllers/orders');

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    // if user not logged in
    // Redirect to homepage
    res.redirect('/');
};

const isAdmin = (req, res, next) => {
    //console.log("Checking")
    if (req.session.user.Type == "Admin") {
        return next();
    }
    res.redirect('/');
};


router.get("/", function (req, res) {
    res.render('home', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get("/dashboard", isAuthenticated, isAdmin, function (req, res) {
    User.GetUsers(req, res, 'dashboard');
    //res.render('dashboard', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get("/profile", isAuthenticated, function (req, res) {
    User.GetUsers(req, res, 'profile')
   // res.render('test', { user: (req.session.user === undefined ? "" : req.session.user) });
});


router.get("/login", function (req, res) {
    if (req.session.user !== undefined) {
        return res.redirect('/'); // Redirect to homepage if user is logged in
    }
    res.render('login', { error: null, user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post("/login", async function (req, res) {
    //res.render('./home');
    if (req.session.user !== undefined) {
        return res.redirect('/'); // Redirect to homepage if user is logged in
    }
    console.log(`User ${req.body.email}: is logging in.`)
    // res.render('home', { user: (req.session.user === undefined ? "" : req.session.user) });
    User.Login(req, res)
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.session.destroy();
    res.redirect('/');
});






router.get("/register", function (req, res) {
    if (req.session.user !== undefined) {
        return res.redirect('/'); // Redirect to homepage if user is logged in
    }
    res.render('register', {user: (req.session.user === undefined ? "" : req.session.user)});
});

router.post("/register", function (req, res) {
    //res.render('login');
    console.log("Registering...............")
    User.AddUser(req, res);

    //console.log(req.body)
    // res.redirect('/')
});

router.post("/updateprofile/:id", function (req, res) {
    //res.render('login');
    User.UpdateUser(req, res);

    //console.log(req.body)
    // res.redirect('/')
});



router.get("/addcar", isAuthenticated, isAdmin, function (req, res) {
    res.render('addcar', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post("/addcar", isAuthenticated, isAdmin, function (req, res) {
    Car.AddCar(req, res);
});



router.get("/orderslist", isAuthenticated, function (req, res) {
    Order.GetAllOrders(req, res)
});









router.get("/users", function (req, res) {
    res.render('users', { user: (req.session.user === undefined ? "" : req.session.user) });
});







router.get("/services", function (req, res) {
    res.render('services', { user: (req.session.user === undefined ? "" : req.session.user) });
});


router.get("/cars/:name", function (req, res) {
    Car.GetCars(req, res);
    //res.render(`cars/${req.params.name}`, { user: (req.session.user === undefined ? "" : req.session.user) });
});

module.exports = router;