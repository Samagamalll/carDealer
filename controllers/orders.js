const Orders = require('../models/orders');


const AddOrder = async (req, res) => {

    if (req.body.Price = "") {
        return res.status(404).send('Car Price Cannot be empty');
    } else if (req.body.Price < 0) {
        return res.status(404).send("Car Price is invalid");
    }
    const order = new Orders({
        BuyerEmail: (req.session.user.Email).toLowerCase(),
        Name: req.session.user.UserName,
        Car: `${req.session.car.Name} ${req.session.car.Model}`,
        Price: req.session.car.Price
    })
    await order.save()
        .then(result => {
            console.log("ADDED TO DB")
            //console.log('order saved:', result);
            return res.redirect('orderSuccess.html');
        })
        .catch(err => {
            return res.status(400).send('Order Failure, Try Again');
            console.log(err);
        });
};


const GetAllOrders = async (req, res) => {
    let query = {};
    if(req.session.user.Type === "Customer")
    {
        query = { BuyerEmail: (req.session.user.Email) };
    }  
    let order;
    await Orders.find(query)
    .sort({ createdAt: -1 })
    .then(result => {
        order = result
    })
    .catch(err => {
        console.log(err);
    });
    res.render('orderslist', { orders: ((order) ? order : []), user: (req.session.user === undefined ? "" : req.session.user) });
      
};

module.exports = {
    AddOrder,
    GetAllOrders,
};
