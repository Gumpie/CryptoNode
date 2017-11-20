var coinTicker = require('coin-ticker');
var exchanges = coinTicker();
var tools = require('./rsi.js')
//console.log(exchanges);
//console.log(coinTicker());

// coinTicker('bittrex', 'pairs')
// .then((pairs) => {
//   pairs.forEach(pair => {
//     coinTicker('bittrex', pair)
//     .then((ticker) => {
//         console.log(ticker);
//     })   
//   });
// });


// coinTicker('bitfinex', 'BTC_USD')
// .then((ticker) => {
//     console.log(ticker);
// })

// h.get({
//     hostname: 'google.com',
//     port: 80,
//     path: '/',
//     agent: false  // create a new agent just for this one request
//   }, (res) => {
//     console.log(res);
//   });

var priceObj = [];

setInterval(function(){ 
    coinTicker('bitfinex', 'BTC_USD')
    .then((ticker) => {
        //console.log(ticker.last);
        priceObj.push({date:ticker.timestamp, data:ticker.last, gain:0.00, loss:0.00, avgGain:0.00, avgLoss:0.00, rs:0.00, rsi:0.00});
        tools.rsi(priceObj, (priceObj.length-1), 14)

        for(var i=0;i<priceObj.length;i++){
            console.log(
                priceObj[i].date + ' | ' + 
                parseFloat(priceObj[i].data).toFixed(2) + ' | ' + 
                parseFloat(priceObj[i].avgGain).toFixed(2) + ' | ' + 
                parseFloat(priceObj[i].avgLoss).toFixed(2) + ' | ' + 
                parseFloat(priceObj[i].rsi).toFixed(2));
        }
    })
}, 10000);


