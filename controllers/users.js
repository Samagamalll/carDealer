const Users = require('../models/user');
//const path = require('path');

const Login = async (req, res) => {
    var query = { Email: req.body.email, Password: req.body.password };
    //console.log(query);
    await Users.findOne(query)
        .then(result => {
            req.session.user = {
                Email: result.Email,
                UserName: result.UserName,
                Mobile: result.Mobile,
                Image: result.Image,
                Type: result.Type,
                Gender: result.Gender,
                createdAt: result.createdAt
            };
            if (result !== null) {
                //console.log(req.session.user)
                return res.render('home', { user: req.session.user });
            }
        })
        .catch(err => {
            res.render('login', { error: 'Wrong email or Password', user: (req.session.user === undefined ? "" : req.session.user) });
            //console.log(err);
        });
}


const AddUser = async (req, res) => {

    const user = new Users({
        Email: req.body.email,
        UserName: req.body.name,
        Password: req.body.password,
        Mobile: req.body.mobile,
        Image: 'imagepath',
        Type: 'Customer',
        Gender: req.body.gender
    })
    console.log(user);
    await user.save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
};


const GetUsers = async (req, res, requestedpage) => {
    let user;
    await Users.find()
        //.sort({ createdAt: -1 })
        .then(result => {
            user = result
        })
        .catch(err => {
        });
    if (req.session.user.Type === "Customer") {
        return res.render(requestedpage, { users: [], user: (req.session.user === undefined ? "" : req.session.user) });
    }
    res.render(requestedpage, { users: ((user) ? user : []), user: (req.session.user === undefined ? "" : req.session.user) });

};


const UpdateUser = async (req, res) => {
    try {
        console.log(req.body.methodtype)
        if (req.body.methodtype === "update") {
            console.log(req.body)
            const temp = await Users.findOneAndUpdate({ Email: req.body.email }, {
                UserName: req.body.username,
                Mobile: req.body.mobile,
                Gender: req.body.gender,
                Type: req.body.type
            });
            if (!temp) {
                return res.status(404).send('User not found');
            }
            if (req.body.email === req.session.user.Email) {
                req.session.user.UserName = req.body.username;
                req.session.user.Mobile = req.body.Mobile;
                req.session.user.Gender = req.body.Gender;
                req.session.user.UserName = req.body.username;
                req.session.user.Type = req.body.type;
            }
            //res.render('', { users: ((user) ? user : []), user: (req.session.user === undefined ? "" : req.session.user) });

            //await Users.findByIdAndUpdate(req.body.email, req.body);
        }
        else if (req.body.methodtype === "delete") {
            //console.log("DELETING SUCCESS")

            const temp = await Users.findOneAndDelete({ Email: req.body.email })
            if (!temp) {
                return res.status(404).send('User not found');
            }
        }
    }
    catch (error) {
        res.status(500).send('Error');
    }
    res.redirect('/profile')
};

module.exports = {
    Login,
    AddUser,
    GetUsers,
    UpdateUser
};