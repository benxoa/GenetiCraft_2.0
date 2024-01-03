const mongoose = require("mongoose");

const geneticraftpdfpricingSchema =new mongoose.Schema(
  {
    plan: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const GenetiCraftPDFPricing = mongoose.model(
  "GenetiCraftPDFPricing",
  geneticraftpdfpricingSchema
);

module.exports = GenetiCraftPDFPricing;
