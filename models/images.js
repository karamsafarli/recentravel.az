const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    headerBackground: {
        description: String,
        path: String
    },

    smallImages: [{
        cityName: String,
        path: String
    }]
}, { timestamps: true });

const Images = mongoose.model('Images', imageSchema);
module.exports = Images