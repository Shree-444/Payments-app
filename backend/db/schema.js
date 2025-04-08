const mongoose = require('mongoose')
const { number } = require('zod')

mongoose.connect('mongodb://localhost:27017')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 1,
        maxLength: 30
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    password: {
        type: String,
        required: true,
        minLength: 4,

    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true 
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = {
    User,
    Account
}
