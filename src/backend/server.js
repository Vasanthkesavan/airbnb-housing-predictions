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
app.get('/api/numberReviews', getNumberOfReviews);
app.get('/api/priceOptimize', makePriceOptimization);

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
    res.status(200).send(JSON.stringify(both));
  })
}

function getCleaningFee(req, res) {
  var ans1 = [];
  var ans2 = [];
  Listing.find({}).find(function (err, data) {
    for(var a = 0; a < data.length; a++) {
      if(data[a].cleaning_fee.length > 2) {
        ans1.push(data[a].cleaning_fee)
      } else {
        ans2.push(data[a].cleaning_fee)
      }
    }
    res.send(JSON.stringify([{data: [ans1.length], label: 'With Cleaning Fee'}, {data: [ans2.length], label: 'Without Cleaning Fee'}])
      );
  })
}

function getNumberOfReviews(req, res) {
  var ans3 = [];
  var ans4 = [];

  Listing.find({}, function (err, data) {
    if(err) {
      console.log(err);
    } else {
      for(b = 0; b < data.length; b++) {
        if(data[b].number_of_reviews > 0 && data[b].number_of_reviews < 10) {
          ans3.push(data[b].number_of_reviews)
        } else if(data[b].number_of_reviews > 20) {
          ans4.push(data[b].number_of_reviews);
        }
      }
    }
    res.send(JSON.stringify([ans3.length, ans4.length]))
  })
}

function makePriceOptimization(req, res) {
  res.send('LOL')
}

