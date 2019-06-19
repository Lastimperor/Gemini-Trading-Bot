const GeminiAPI = require("gemini-api").default;
const secret = "sandbox-key";
const key = "account-key";
const restClient = new GeminiAPI({key,secret, sandbox:true});

module.export = {

  marketBuyBitcoin:function(){
    return restClient.newOrder({amount:1,
                        price:10000,
                        side:"buy",
                        symbol:"btcusd",
                        options:["immediate-or-cancel"]})
  },

  marketSellBitcoin:function(){
    return restClient.newOrder({amount:1,
                        price:10,
                        side:"sell",
                        symbol:"btcusd",
                        options:["immediate-or-cancel"]})
  },

  bitcoinPrice:function(){
    return restClient.getTicker("btcusd");
  }

}
