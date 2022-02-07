const express = require("express");
const bodyParser = require("body-parser");

const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

var cripto = req.body.cripto;
var fiat = req.body.fiat;

console.log(cripto);
console.log(fiat);

var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
var finalURl= baseURL + cripto + fiat;
  request(finalURl,function(error,response,body){

    var data = JSON.parse(body);
    var price = data.last;
    var currentDate = data.display_timestamp;

    res.write("Today's Date is " + currentDate);

    res.write("The Last Price Of " + cripto + "is" + price + fiat);

    res.send();

  });
});

app.listen(3000,function(){
  console.log("WE are running at port 3000");
});
