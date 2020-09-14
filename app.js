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



let contactData;
let notificationData;
let bedsData;
let stateList;
const ageList = ["0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70 and above"];
app.get("/",function(req, res){
  const url = "https://api.rootnet.in/covid19-in/contacts";
  axios.get(url)
  .then(response => {
    const jsonData = response.data;
    stateList = jsonData.data.contacts.regional;
    })
  .catch(error => {
    console.log(error);
  });

  res.render("home",{
      stateList: stateList,
      ageList: ageList
  });


});

app.post("/",function(req, res){
  console.log(req.body.stateName);
  console.log(req.body.age);
  console.log(req.body.gender);


});

app.get("/notifications",function(req, res){
  const url = "https://api.rootnet.in/covid19-in/notifications";
  axios.get(url)
  .then(response => {
    const jsonData = response.data;
    notificationData = jsonData.data.notifications;

    // console.log();
    // console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });


  res.render("notifications",{
    notificationList: notificationData
  });

});
app.get("/hospital-dash",function(req, res){

  const url = "https://api.rootnet.in/covid19-in/hospitals/beds";
  axios.get(url)
  .then(response => {
    const jsonData = response.data;
    bedsData = jsonData.data.regional;

    // console.log();
    // console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });


  res.render("hospital-dash",{
    bedsList: bedsData
  });

});
app.get("/contact-helpline",function(req, res){
  const url = "https://api.rootnet.in/covid19-in/contacts";
  axios.get(url)
  .then(response => {
    const jsonData = response.data;
    contactData = jsonData.data.contacts.regional;

    // console.log();
    // console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
  });

  res.render("contact-helpline",{
    regionalList: contactData
  });

});


let port = process.env.PORT;
if(port == null || port==""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
