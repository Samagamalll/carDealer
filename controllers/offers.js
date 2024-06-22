const Offers = require('../models/offers');

const GetLatestOffers = async (req, res) => {
    var query = {};
    let offer;
    await Offers.find(query)
        .sort({ createdAt: -1 })
        .then(result => {
            offer = result
        })
        .catch(err => {
            return [];
        });
    if (offer) {
        return offer;
    }
    return [];
};


const AddOffer = async (req, res) => {

    try {
        const existingoffer = await Offers.findOne({ carID: req.body.carID });
        if (existingoffer) {
            return res.status(400).send('Car ID already exists');
        }
        if (req.body.carName === "") {
            return res.status(404).send('Car name cannot be empty');
        }
        if (req.body.carModel === "") {
            return res.status(404).send('Car Model cannot be empty');
        }
        if (req.body.carDiscount === "") {
            return res.status(404).send('Discount cannot be empty');
        } else if (req.body.carDiscount < 0) {
            return res.status(404).send('Discount rate is invalid');
        }
        if (!req.body.carPrice) {
            return res.status(404).send('Car Price Cannot be empty');
        } else if (req.body.carPrice <= 0) {
            return res.status(404).send("Car Price is invalid");
        }
        if (req.body.imgurl === "") {
            return res.status(404).send('Image url Cannot be empty');
        }

        const offer = new Offers({
            carID: req.body.carID,
            Name: (req.body.carName).toLowerCase(),
            Model: req.body.carModel,
            Price: req.body.carPrice,
            Discount: req.body.carDiscount,
            Image: req.body.imgurl
        })
        console.log(offer);
        await offer.save()
            .then(result => {
                console.log("ADDED Offer TO DB")
                res.redirect('/');
            })
            .catch(err => {
                console.log("FAILED TO SAVE")
                console.log(err);
            });
    }
    catch (error) {
        console.log(error)
        return res.status(500).send('Error Adding Offer');
    }
};


const UpdateOffer = async (req, res) => {
    try {
        console.log(req.body.methodtype)
        if (req.body.methodtype === "update") {
            if (req.body.carName === "") {
                return res.status(404).send('Car name cannot be empty');
            }
            if (req.body.carModel === "") {
                return res.status(404).send('Car Model cannot be empty');
            }
            if (req.body.Discount === "") {
                return res.status(404).send('Discount cannot be empty');
            } else if (req.body.Discount < 0 || req.body.Discount > 100) {
                return res.status(404).send('Discount rate is invalid');
            }
            if (!req.body.OldPrice) {
                return res.status(404).send('Car Price Cannot be empty');
            } else if (req.body.OldPrice <= 0) {
                return res.status(404).send("Car Price is invalid");
            }
            if (req.body.imgurl === "") {
                return res.status(404).send('Image url Cannot be empty');
            }
            const temp = await Offers.findOneAndUpdate({ carID: req.body.carID }, {
                Name: req.body.carName,
                Model: req.body.carModel,
                Price: req.body.OldPrice,
                Discount: req.body.Discount,
                Image: req.body.imgurl
            });
            if (!temp) {
                return res.status(404).send('Offer not found');
            }

        }
        else if (req.body.methodtype === "delete") {
            //console.log("DELETING SUCCESS")

            const temp = await Offers.findOneAndDelete({ carID: req.body.carID })
            if (!temp) {
                return res.status(404).send('Offer not found');
            }
        }
    }
    catch (error) {
        console.log("Offer error")
        return res.status(500).send('Error Updating or deleting offer');
    }
    res.redirect('/offers')
};

module.exports = {
    GetLatestOffers,
    AddOffer,
    UpdateOffer
};