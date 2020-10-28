const mongoose = require('mongoose');

const whatsappSchema = mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    recieved :Boolean
});

module.exports = mongoose.model('messagecontents', whatsappSchema)