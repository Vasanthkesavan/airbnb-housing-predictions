var express = require('express')
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('underscore');

var db = require('./db').mongoose;
var Listing = require('./db').listingModel;


var app = express();

app.listen(process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/hostVerification', getHostVerification);


function getHostVerification(req, res) {
  var both = [];
  Listing.find({
    "host_identity_verified": 't',
  }, function (err, data) {
    if(err) {
      console.log('err happened with cool down retrieval: ' + err);
    } else{
      const cbData = data;
      let priceArr = [];
      let sum;
      for(var i = 0; i < cbData.length; i++) {
        priceArr.push(parseInt(cbData[i].price.replace("$", "")));
      }
      sum = priceArr.reduce(function(a,b) { return a + b; })
      both.push(JSON.stringify(sum));
    }
  })


  Listing.find({}, function (err, data) {
    if(err) {
      console.log('err happened with cool down retrieval: ' + err);
    } else{
      const cbData = data;
      let priceArr = [];
      let sum;
      for(var j = 0; j < cbData.length; j++) {
        priceArr.push(parseInt(cbData[j].price.replace("$", "")));
      }
      sum = priceArr.reduce(function(a,b) { return a + b; })
      both.push(JSON.stringify(sum));
    }
    res.send(JSON.stringify(both));
  })
}
