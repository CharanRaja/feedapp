const mongoose = require('mongoose');
const FeedsSchema = mongoose.Schema({
    title: { type: String },
    description: { type: String },
    uploadedBy: { type: String}
});
module.exports = mongoose.model('Feeds', FeedsSchema);