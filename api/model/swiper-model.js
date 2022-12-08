const mongoose = require('mongoose')

const SwiperSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    owner:{
        type: String,
        require: true
    }
},{
    collection:"Swiper"
})

module.exports = mongoose.model("Swiper", SwiperSchema)