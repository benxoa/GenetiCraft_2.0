const mongoose = require('mongoose');

const geneticraftpdfcontactSchema =new mongoose.Schema({

    email: {
        type: String,
        required: true,

    },
    subject: {
        type: String,
    },
    message: {
        type: String,
    }
}, 
{
    timestamps: true
})



const GenetiCraftPDFContact = mongoose.model('GenetiCraftPDFContact', geneticraftpdfcontactSchema);

module.exports = GenetiCraftPDFContact;