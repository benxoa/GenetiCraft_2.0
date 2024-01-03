const mongoose = require('mongoose');

const purchseSchema = new mongoose.Schema({
    plan: [
        {type: mongoose.ObjectId,
        ref: "GenetiCraftPricing"},
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "GenetiCraftUser"
    },
    
})

const GenetiCraftPurchase = mongoose.model(
    "GenetiCraftPurchase",
    purchseSchema
  );

module.exports = GenetiCraftPurchase;