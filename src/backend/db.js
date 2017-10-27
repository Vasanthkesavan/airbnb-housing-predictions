var mongoose = require('mongoose');
var dbUri = require('./dbInfo').dbUri;
var Schema = mongoose.Schema;


mongoose.connect('mongodb://' + dbUri);

mongoose.connection.once('open', function() {
  console.log('database is connected');
});

mongoose.connection.on('error', function(error) {
  console.log('database connection error: ' + error);
});

var listingSchema = new Schema({
  host_verifications: String,
  price: String
});

var Listing = mongoose.model('Listing', listingSchema, 'listings');

module.exports.listingModel = Listing;
