const mongoose = require('mongoose');

const daxiliturSchema = new mongoose.Schema({
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

    price: {
        type: String,
        required: true
    },

    background: {
        type: String,
        required: true
    }
}, { timestamps: true });

const DaxiliTur = mongoose.model('DaxiliTur', daxiliturSchema);
module.exports = DaxiliTur;

