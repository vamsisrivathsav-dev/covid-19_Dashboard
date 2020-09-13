const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
// const _ = require("lodash");
const axios = require('axios');



const app = express();

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



let homeData;
app.get("/",function(req, res){

  // https.get(url, function(response){
  //   response.on("data", function(data){
  //     const receivedData = JSON.parse(data);
  //     // console.log(data);
  //   //   const receivedData = JSON.parse(JSON.stringify(data));
  //   // console.log(receivedData);
  //   })
  // });

  res.render("home",{

  });


});

app.get("/notifications",function(req, res){
  res.render("notifications",{

  });

});
app.get("/hospital-dash",function(req, res){
  res.render("hospital-dash",{

  });

});
app.get("/contact-helpline",function(req, res){
  const url = "https://api.rootnet.in/covid19-in/contacts";
  axios.get(url)
  .then(response => {
    const jsonData = response.data;
    homeData = jsonData.data.contacts.regional;

    // console.log();
    // console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });

  res.render("contact-helpline",{
    regionalList: homeData
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
