const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Exercise', exerciseSchema);