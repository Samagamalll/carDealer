const Cars = require('../models/car');

const AddCar = async (req, res) => {
    const car = new Cars({
        Name: (req.body.carName).toLowerCase(),
        Model: req.body.carModel,
        Price: req.body.carPrice,
        Color: req.body.carColor,
        Engine: req.body.engineCapacity,
        Power: req.body.power,
        Transmission: req.body.transmission,
        Fuel: req.body.fuel,
        Year: req.body.year,
        Image: req.body.imgurl
    })
    console.log(car);
    await car.save()
        .then(result => {
            console.log("ADDED TO DB")
            //console.log('Car saved:', result);
            res.redirect('/');
        })
        .catch(err => {
            console.log("FAILED TO SAVE")
            console.log(err);
        });
};

const GetCars = async (req, res) => {
    var query = { Name: (req.params.name).toLowerCase() };
    let car;
    await Cars.find(query)
    .sort({ createdAt: -1 })
    .then(result => {
        //console.log(result)
        car = result
        //console.log(result[0]._id.toString());
     
    })
    .catch(err => {
      //console.log(err);
    });
   // console.log(car)
    res.render(`cars/${req.params.name}`, { cars: ((car) ? car : []), user: (req.session.user === undefined ? "" : req.session.user) });
      
};

module.exports = {
    AddCar,
    GetCars
};