var express = require('express')
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('underscore');

var db = require('./db').mongoose;
var Listing = require('./db').listingModel;


var app = express();

app.listen(process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next){
  res.header("Content-Security-Policy", "default-src 'self';script-src 'self';object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");
  next();
});

app.get('/api/hostVerification', getHostVerification);
app.get('/api/getCleaningFee', getCleaningFee);

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
      both.push(Math.round(sum/cbData.length));
    }
  })

  Listing.find({
    "host_identity_verified": 'f',
  }, function (err, data) {
    if(err) {
      console.log('err happened with cool down retrieval: ' + err);
    } else{
      const cbData = data;
      let priceArr = [];
      let sum;
      for(var k = 0; k < cbData.length; k++) {
        priceArr.push(parseInt(cbData[k].price.replace("$", "")));
      }
      sum = priceArr.reduce(function(a,b) { return a + b; })
      both.push(Math.round(sum/cbData.length));
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
      both.push(Math.round(sum/cbData.length));
    }
    res.send(JSON.stringify(both));
  })
}

function getCleaningFee(req, res) {
  res.send(JSON.stringify([200, 100]))
}
