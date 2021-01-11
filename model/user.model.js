const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: { type: String },
    email_id: { type: String } , 
    password: { type: String } , 
    mobile: { type: Number } ,
    gender: { type: String },
    followed : { type: Array }
});
module.exports = mongoose.model('User', UserSchema);