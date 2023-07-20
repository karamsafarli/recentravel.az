const mongoose = require('mongoose');

const visaSchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    imagePath: {
        type: String,
        required: true
    },

    background: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Visa = mongoose.model('Visa',visaSchema);
module.exports = Visa;