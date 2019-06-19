const CCAPIKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
const CryptocompareAPI = require("cryptocompare");
CryptocompareAPI.setApiKey(CCAPIKey);

// 100 hour MA

module.export = {
    hourlyMovingAverage:function (cryptoAsset, fiatcurrency, hours, callback){

    if(hours>169){
      console.error("only up to 169 hours allowed!")
      return
    }

    // 1. get data from cryptocompare => close price in the last 100 hours
    CryptocompareAPI.histoHour(cryptoAsset, fiatcurrency)
    .then(data => {

      // 2. calculate MA from 100 past hour => HistoHour() on npmjs cryptocompare
      data = data.reverse()
      var sum = 0;
      for(var i = 0;i<hours;i++){
        sum+=data[i].close;
        /*console.log(i);
        console.log(data[i].close)*/
      }

      var movingAverage = Math.floor(sum/hours);
      callback(movingAverage);
      /*console.log(data[0])
      console.log(data.length)*/

    })
    .catch(console.error)

  }

}
