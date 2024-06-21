const Users = require('../models/user');
//const path = require('path');

const Login = async (req, res) => {
    let query = { Email: req.body.email, Password: req.body.password };
    try {
        const result = await Users.findOne(query);
        if (result) {
            req.session.user = {
                Email: result.Email,
                UserName: result.UserName,
                Mobile: result.Mobile,
                Image: result.Image,
                Type: result.Type,
                Gender: result.Gender,
                createdAt: result.createdAt
            };
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false; 
    }
};


const AddUser = async (req, res) => {
    try {
        const existinguser = await Users.findOne({ Email: req.body.email });
        if (existinguser) {
            return res.status(400).send('Email already exists');
        }
        if (req.body.mobile === "") {
            return res.status(400).send('Emptyy Phone number');
        } else {
            var regex = /^[0-9]{11}$/;
            if (regex.test(req.body.mobile) === false) {
                return res.status(400).send('Mobile number less than 11 characters');
            }
        }

        const user = new Users({
            Email: req.body.email,
            UserName: req.body.name,
            Password: req.body.password,
            Mobile: req.body.mobile,
            Image: 'imagepath',
            Type: 'Admin',
            Gender: req.body.gender
        });

        await user.save()
            .then(result => {

                console.log(savedUser);
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
            });

    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};


const GetUsers = async (req, res) => {
    try {
        let user;
        await Users.find()
            //.sort({ createdAt: -1 })
            .then(result => {
                user = result
            })
            .catch(err => {
            });
        if (req.session.user.Type === "Customer") {
            return [];
        }
        return user;
    }
    catch (error) {
        res.status(500).send('Get Users Error');
        return [];
    }
    //res.render(requestedpage, { users: ((user) ? user : []), user: (req.session.user === undefined ? "" : req.session.user) });

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