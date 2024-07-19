const mongoose = require('mongoose');
const path = require('path')

const ratingSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    description: {
        type: String,

    },
    ratings: {
        type: mongoose.Mixed,
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
        default: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
        required: true
    },
    image: [String]

});

// Add a getter function to retrieve the rating of a product
ratingSchema.virtual('rating').get(function () {
    const ratings = this.get('ratings', null, { getters: false });
    let total = 0;
    let count = 0;
    for (const key in ratings) {
        total += key * ratings[key];
        count += ratings[key];
    }
    return total / count;
});

// Add a setter function to update the ratings of a product
ratingSchema.virtual('rating').set(function (r) {
    if (!(this instanceof mongoose.Document)) {
        // only call setter when updating the whole path with an object
        if (r instanceof Object) return r;
        else {
            throw new Error('');
        }
    } else {
        // get the actual ratings object without using the getter
        if (r instanceof Object) {
            return r; // handle setting default when creating object
        }
        this.get('ratings', null, { getters: false })[r] = 1 + parseInt(this.get('ratings', null, { getters: false })[r]);
        return this.get('ratings', null, { getters: false });
    }
});

module.exports = mongoose.model('ratings', ratingSchema);


