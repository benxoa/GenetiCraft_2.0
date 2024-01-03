const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const statusEnum = require('../../enums/UserStatus');

const geneticraftpdfuserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        default: 15 
    },
    status: {
        type: String,
        enum: statusEnum,
        default: statusEnum.INACTIVE
    },
    verification:{type: String}
}, 
{
    timestamps: true
})

geneticraftpdfuserSchema.methods.deductCredits = async function (amount) {
    if (this.credits >= amount) {
        this.credits -= amount;
        await this.save();
        return true; 
    } else {
        return false;
    }
};

geneticraftpdfuserSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    }, process.env.JWT)
    return token
}

const GenetiCraftPDFUser = mongoose.model('GenetiCraftPDFUser', geneticraftpdfuserSchema);

module.exports = GenetiCraftPDFUser;