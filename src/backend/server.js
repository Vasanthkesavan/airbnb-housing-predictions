var express = require('express')
var bodyParser = require('body-parser');
var path = require('path');

var db = require('./db').mongoose;
var Listing = require('./db').listingModel;


var app = express();

app.listen(process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/hostVerification', getHostVerification);



function getHostVerification(req, res) {
  Listing.find({
    "house_rules": "",
  }, function (err, data) {
    if(err) {
      console.log('err happened with cooldown retrieval: ' + err);
    } else{
      res.send(JSON.stringify(data[0].host_verifications));
    }
  })
}
