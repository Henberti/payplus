const {Schema, model, Types} = require('mongoose');

const customerSchema = new Schema({
    userId: {type: Types.ObjectId, required: true, ref: 'User'},
    name: {type: String, required: true},
    phone_number: {type: String, required: true},
    email: {type: String, required: true},
    birth_date: {type: Date, required: true},
}, {timestamps: true});



customerSchema.index({userId: 1}, {unique: true});


const Customer = model('Customer', customerSchema);

module.exports = {
    Customer,
};