const mongoose = require('mongoose');

const xariciturSchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    imagePath: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const XariciTur = mongoose.model('XariciTur', xariciturSchema);
module.exports = XariciTur;

