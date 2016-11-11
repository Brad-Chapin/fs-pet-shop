var express = require ("express");
var app = express();

app.use(express.static ("public"));

app.get("/pets", function (req, res){
  res.send ({greeting: "Hello"});
})

app.listen ("8000", function (){
  console.log("listen on port 8000");
});
