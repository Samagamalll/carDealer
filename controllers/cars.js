const Cars = require('../models/car');

const AddCar = async (req, res) => {

    try {
        if (req.body.carName === "") {
            return res.status(404).send('Car name cannot be empty');
        }
        if (req.body.carModel === "") {
            return res.status(404).send('Car Model cannot be empty');
        }
        if (!req.body.carPrice) {
            return res.status(404).send('Car Price Cannot be empty');
        } else if (req.body.carPrice <= 0) {
            return res.status(404).send("Car Price is invalid");
        }
        if (req.body.imgurl = "") {
            return res.status(404).send('Image url Cannot be empty');
        }
        if (req.body.carColor = "") {
            return res.status(404).send('Color Cannot be empty');
        }
        if (req.body.engineCapacity = "") {
            return res.status(404).send('Engine Capacity Cannot be empty');
        }
        if (req.body.power = "") {
            return res.status(404).send('Power Cannot be empty');
        }
        if (req.body.transmission = "") {
            return res.status(404).send('Transmission Cannot be empty');
        }
        if (req.body.fuel = "") {
            return res.status(404).send('Fuel Cannot be empty');
        }
        if (req.body.year = "") {
            return res.status(404).send('Year Cannot be empty');
        }

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
                res.redirect('/');
            })
            .catch(err => {
                console.log("FAILED TO SAVE")
                console.log(err);
            });
    }
    catch (error) {
        res.status(500).send('Error Adding Car');
    }
};


const GetCars = async (req, res) => {
    let query = {};
    if (req.params.name !== undefined) {
        query = { Name: (req.params.name).toLowerCase() };
    }
    let car;
    await Cars.find(query)
        .sort({ createdAt: -1 })
        .then(result => {
            car = result
        })
        .catch(err => {
            console.log("Cars not found")
            return [];

        });
    if (car) {
        return car;
    }
    return [];
    // console.log(car) 
};

const UpdateCar = async (req, res) => {
    try {
        console.log(req.body.methodtype)
        if (req.body.methodtype === "update") {
            if (req.body.carName === "") {
                return res.status(404).send('Car name cannot be empty');
            }
            if (req.body.carModel === "") {
                return res.status(404).send('Car Model cannot be empty');
            }
            if (!req.body.carPrice) {
                return res.status(404).send('Car Price Cannot be empty');
            } else if (req.body.carPrice <= 0) {
                return res.status(404).send("Car Price is invalid");
            }
            if (req.body.imgurl = "") {
                return res.status(404).send('Image url Cannot be empty');
            }
            if (req.body.carColor = "") {
                return res.status(404).send('Color Cannot be empty');
            }
            if (req.body.carEngine = "") {
                return res.status(404).send('Engine Capacity Cannot be empty');
            }
            if (req.body.carPower = "") {
                return res.status(404).send('Power Cannot be empty');
            }
            if (req.body.carTransmission = "") {
                return res.status(404).send('Transmission Cannot be empty');
            }
            if (req.body.carFuel = "") {
                return res.status(404).send('Fuel Cannot be empty');
            }
            if (req.body.carYear = "") {
                return res.status(404).send('Year Cannot be empty');
            }
            const temp = await Cars.findOneAndUpdate({ _id: req.body.carID }, {
                Name: req.body.carName,
                Model: req.body.carModel,
                Price: req.body.carPrice,
                Color: req.body.carColor,
                Engine: req.body.carEngine,
                Power: req.body.carPower,
                Transmission: req.body.carTransmission,
                Fuel: req.body.carFuel,
                Year: req.body.carYear,
                Image: req.body.imgurl
            });
            if (!temp) {
                return res.status(404).send('Car not found to edit');
            }

        }
        else if (req.body.methodtype === "delete") {
            const temp = await Cars.findOneAndDelete({ Name: req.body.carName })
            if (!temp) {
                return res.status(404).send('Car not found');
            }
        }
    }
    catch (error) {
        res.status(500).send('Error Updating Car');
    }
    res.redirect('/carsedit')
};

module.exports = {
    AddCar,
    GetCars,
    UpdateCar
};