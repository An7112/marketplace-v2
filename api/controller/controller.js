
const mongoose = require('mongoose')
const CollectionSchema = require('../model/model')

exports.getCollection = async (req, res) => {
    try {
        const Collection = await CollectionSchema.find()
        res.json(Collection)
    } catch (err) {
        res.json({ message: err })
    }
}

exports.createCollection = async (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    const Collection = new CollectionSchema({
        address: req.body.address,
        username: req.body.username,
        blockchain: req.body.blockchain,
        description: req.body.description,
        logo: url + "/public/" + req.files['logo'][0].filename,
        featuredImage: url + "/public/" + req.files['featuredImage'][0].filename,
        banner: url + "/public/" + req.files['banner'][0].filename
    })
    try {
        const saveCollection = await Collection.save().then((result) => {
            res.status(200).json({
                message: "created a successful collection!",
                nftCreated: {
                    address: result.address,
                    username: result.username
                }
            })
        })
        
        res.json(saveCollection)
    } catch (err) {
        res.json({ message: err })
    }
}

exports.getCollectionById = async (req, res) => {
    try {
        const Collection = await CollectionSchema.findById(req.params._id)
        res.json(Collection)
    } catch (err) {
        res.json({ message: err })
    }
}


exports.removeCollection = (req, res) => {
    CollectionSchema.remove({ _id: req.params._id }, function (err, response) {
        if (err) {
            res.status(201).json({
                code: 201,
                message: "Error from removeCollection"
            })
        } else {
            res.status(200).json({
                code: 200,
                message: "removeCollection successfully!",
                data: response
            })
        }
    })
}

exports.updateCollection = async (req, res) => {
    const url = req.protocol + '://' + req.get("host");
    const updateCollections = {
        address: req.body.address,
        username: req.body.username,
        blockchain: req.body.blockchain,
        description: req.body.description,
        // avatar:req.body.avatar || url + "/public/" + req.file.filename
        logo: req.body.logo || url + "/public/" + req.files['logo'][0].filename,
        featuredImage: req.body.featuredImage || url + "/public/" + req.files['featuredImage'][0].filename,
        banner: req.body.banner || url + "/public/" + req.files['banner'][0].filename
    };
    CollectionSchema.findByIdAndUpdate(
        { _id: req.params._id },
        updateCollections,
        function (err, response) {
            if (err) {
                res.status(201).json({
                    code: 201,
                    message: "Error updateCollection",
                });
            } else {
                res.status(200).json({
                    code: 200,
                    message: "updateCollection Successfully!",
                    data: response,
                });
            }
        }
    );
}
