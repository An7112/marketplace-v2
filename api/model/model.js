
const mongoose = require('mongoose')

const CollectionSchema = mongoose.Schema({
    address:{
        type: String,
        require: true
    },
    username:{
        type: String,
        require: true
    },
    blockchain:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    logo:{
        type: String,
        require: true
    },
    featuredImage:{
        type: String,
        require: true
    },
    banner:{
        type: String,
        require: true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{
    collection:"Collection"
})

module.exports = mongoose.model("Collection", CollectionSchema)