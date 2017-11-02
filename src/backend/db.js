var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost/airbnb');

mongoose.connection.once('open', function() {
  console.log('database is connected');
});

mongoose.connection.on('error', function(error) {
  console.log('database connection error: ' + error);
});

var listingSchema = new Schema({
  host_verifications: String,
  price: String,
  cleaning_fee: String,
  review_score_cleanliness: Number,
  number_of_reviews: Number,
  latitude: Number,
  longitude: Number,
  weekly_price: String,
  review_scores_rating: Number,
  review_scores_accuracy: Number,
  review_scores_cleanliness: Number,
  review_scores_checkin: Number,
  review_scores_communication: Number,
  review_scores_location: Number,
  review_scores_value: Number
});

var Listing = mongoose.model('Listing', listingSchema, 'listing');

module.exports.listingModel = Listing;
