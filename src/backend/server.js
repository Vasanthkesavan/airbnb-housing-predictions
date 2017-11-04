var express = require('express')
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('underscore');

var db = require('./db').mongoose;
var Listing = require('./db').listingModel;


var app = express();

app.listen(process.env.PORT || 3000);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.use(function(req, res, next){
  res.header("Content-Security-Policy", "default-src 'self';script-src 'self';object-src 'none';img-src 'self';media-src 'self';frame-src 'none';font-src 'self' data:;connect-src 'self';style-src 'self'");
  next();
});

app.get('/api/hostVerification', getHostVerification);
app.get('/api/getCleaningFee', getCleaningFee);
app.get('/api/numberReviews', getNumberOfReviews);
app.post('/api/priceOptimize', makePriceOptimization);
app.post('/api/bookingOptimize', makeBookingOptimization);
/* Helper functions */

function approxGeoLocation(lat, long) {
  var parsedDecLat = parseInt((lat + "").split(".")[1]);
  var parsedDecLong = parseInt((long + "").split(".")[1]);

  parsedDecLat = parsedDecLat.toString().split('').reduce(function(a, b) { return Number(a) + Number(b) });
  parsedDecLong = parsedDecLong.toString().split('').reduce(function(a, b) { return Number(a) + Number(b) });

  return [parsedDecLat, parsedDecLong];
}

function twentyPercentApprox(geoLocation) {
  var lat = geoLocation[0];
  var long = geoLocation[1];

  var lat20 = (25 / 100) * lat;
  var long20 = (25 / 100) * long;

  return [[Math.round(lat + lat20), Math.round(lat - lat20)], [Math.round(long + long20), Math.round(long - long20)]];
}

function convertNumber(dollar) {

    return parseInt(dollar.replace("$", '').replace(/,/g, ''));

}


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
  const latitude = Number(req.body[0]);
  const longitude = Number(req.body[1]);
  const parsed = twentyPercentApprox(approxGeoLocation(latitude, longitude));

  Listing.find({}, function (err, data) {
    var result = [];

    if(err) {
      console.log(err);
    } else {
      for(c = 0; c < data.length; c++) {
        var appr = approxGeoLocation(data[c].latitude, data[c].longitude);
        var aLatitude = appr[0];
        var aLongitude = appr[1];
        if(parsed[0][0] >= aLatitude && aLatitude >= parsed[0][1]) {
          if(parsed[1][0] >= aLongitude && aLongitude >= parsed[1][1]) {
            result.push(convertNumber(data[c].weekly_price));
          }
        }
      }
      if(result.length === 0) {
        return res.send(JSON.stringify('Please enter a valid latitude and longitude'))
      } else {
        return res.send(JSON.stringify((result.filter(Boolean).reduce(function (a, b) {
          return a + b;
        })/ result.length)))
      }
    }
  })
}

function makeBookingOptimization(req, res) {
  const latitude = Number(req.body[0]);
  const longitude = Number(req.body[1]);
  const parsed = twentyPercentApprox(approxGeoLocation(latitude, longitude));

  Listing.find({}, function (err, data) {
    var result = [];

    if(err) {
      console.log(err);
    } else {
      for(var d = 0; d < data.length; d++) {
        var approx = approxGeoLocation(data[d].latitude, data[d].longitude);
        var bLatitude = approx[0];
        var bLongitude = approx[1];

        if(parsed[0][0] >= bLatitude && bLatitude >= parsed[0][1]) {
          if(parsed[1][0] >= bLongitude && bLongitude >= parsed[1][1]) {
            if(data[d].review_scores_rating >= 95) {
              var sum = data[d].review_scores_accuracy + data[d].review_scores_communication + data[d].review_scores_checkin + data[d].review_scores_location + data[d].review_scores_value;
               if(sum >= 45) {
                 result.push(convertNumber(data[d].price))
               }
            }
          }
        }

      }
      if(result.length === 0) {
        return res.send(JSON.stringify('Please enter a valid latitude and longitude'))
      } else {
        return res.send(JSON.stringify((result.filter(Boolean).reduce(function (a, b) {
          return a + b;
        })/ result.length)))
      }
    }
  })

}

