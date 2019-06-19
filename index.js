global.fetch = require("node-fetch");

const indicators = require("./indicators.js");
const exchange = require("./exchange.js");

var hasPosition = false;
var strategy = function(){
  // if btc < MA => buy (if we have no position)
  // if btc > MA => sell (if we have a position)
  console.log("                  ");
  console.log("==================");
  console.log("executing strategy");
  definitions.hourlyMovingAverage("BTC", "USD", 10, function(ma){

    positions.bitcoinPrice()
    .then(response => {
      var price = response.last;
      console.log("MA:", ma);
      console.log("Price: ", price);
      /*console.log(response);*/

      if(price < ma && !hasPosition){

        console.log("BUY!")
        positions.marketBuyBitcoin()
        .then(response => {
          console.log("buy successful")
          hasPosition = true;
          // wait 1000 mill seconds => ctrl + c to stop on windows powershell
          setTimeout(strategy, 1000);
        })
        .catch(error => console.error)
      }

      else if(price > ma && hasPosition){

        console.log("SELL!")
        positions.marketSellBitcoin()
        .then(response => {
          console.log("sell successful")
          hasPosition = false;
          // wait 1000 mill seconds => ctrl + c to stop on windows powershell
          setTimeout(strategy, 1000);
        })
        .catch(error => console.error)
      }

      else{
        console.log("HOLD!");
        // wait 1000 mill seconds => ctrl + c to stop on windows powershell
        setTimeout(strategy, 1000);
      }

    })

  });
}

strategy();
