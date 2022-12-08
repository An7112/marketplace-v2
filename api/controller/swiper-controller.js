const mongoose = require('mongoose')
const Swiper = require('../model/swiper-model')

exports.getSwiper = async (req, res) => {
    try {
        const swiper = await Swiper.find()
        res.json(swiper)
    } catch (err) {
        res.json({ message: err })
    }
}

exports.createSwiper = async (req, res) => {
    const url = req.protocol + "://" + req.get("host")
    const swiper = new Swiper({
        title: req.body.title,
        price: req.body.price,
        owner: req.body.owner,
        image: url + "/swiper/" + req.file.filename
    })
    try {
        const saveSwiper = await swiper.save().then((result) => {
            res.status(200).json({
                message: "created a successful swiper!",
                swiperCreated: {
                    title: result.title,
                    price: result.price,
                    image: result.image,
                    owner: result.owner
                }
            })
        })
        res.json(saveSwiper)
    } catch (err) {
        res.json({ message: err })
    }
}

exports.getSwiperById = async (req, res) => {
    try {
        const swiper = await Swiper.findById(req.params._id)
        res.json(swiper)
    } catch (err) {
        res.json({ message: err })
    }
}


exports.removeSwiper = (req, res) => {
    Swiper.remove({ _id: req.params._id }, function (err, response) {
        if (err) {
            res.status(201).json({
                code: 201,
                message: "Error from removeSwiper"
            })
        } else {
            res.status(200).json({
                code: 200,
                message: "removeSwiper successfully!",
                data: response
            })
        }
    })
}

exports.updateSwiper = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const updateSwiper = {
        image: url + "/public/" + req.file.filename,
        title: req.body.title,
        price: req.body.price,
        owner: req.body.owner
    };
    Swiper.findByIdAndUpdate(
        { _id: req.params._id },
        updateSwiper,
        function (err, response) {
            if (err) {
                res.status(201).json({
                    code: 201,
                    message: "Error updateSwiper",
                });
            } else {
                res.status(200).json({
                    code: 200,
                    message: "updateSwiper Successfully!",
                    data: response,
                });
            }
        }
    );
}
