const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, 'required': true},
    exercise: {type: Schema.Types.ObjectId, ref: 'Exercise'}
});

module.exports = mongoose.model('User', userSchema);