const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require ("https");
const { dirname } = require("path");

const app = express ();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html" );
});

app.post("/", function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.mail;

    const data = {
        members : [
            { email_address : email ,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us6.api.mailchimp.com/3.0/lists/a656461d98" ;

    const options = {
        method : "POST",
        auth : "daniela1:891650aaad89c46c0a45009640e95a69-us6" 
    }

    const request = https.request(url, options, function(response){
       if (response.statusCode === 200){
        res.sendFile (__dirname + "/success.html")
       }
       else {
        res.sendFile(__dirname + "/failure.html")
       }
        response.on("data", function(data){
            console.log(JSON.parse(data));
            
    });

}) ;

app.post("/failure", function(req, res){
    res.sendFile (__dirname + "/index.html");
    // I can use this too - res.redirect("/");
});

request.write(jsonData);
request.end();
});

app.listen(3000, function(){
    console.log("I am port 3000 Daniella.");
});

// API KEY
// 891650aaad89c46c0a45009640e95a69-us6

// list id
// a656461d98