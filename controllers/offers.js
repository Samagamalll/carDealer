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
};

const UpdateOffer = async (req, res) => {
    try {
        console.log(req.body.methodtype)
        if (req.body.methodtype === "update") {
            console.log(req.body)
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
        return res.status(500).send('Error');
    }
    res.redirect('/offers')
};


module.exports = {
    GetLatestOffers,
    AddOffer,
    UpdateOffer
};