const mongoose =  require ('mongoose')
const OfferSchema =  new mongoose.Schema({

    offer_name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    offer_percentage:{
        type:String,
        required:true
    }
})

const OfferModel = new mongoose.model('Offer', OfferSchema);
module.exports = OfferModel;