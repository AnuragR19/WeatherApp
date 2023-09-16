const express=require ("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

   res.sendFile(__dirname +"/index.html");

});

app.post("/",function(req,res){
    const apiKey="70a5d91124a0b043f48b9b3b3abf9561";
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey+"&units=metric "
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data); 
            const temp=weatherData.main.temp;
            const icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The Temperature of "+ query +" is " + temp +" degree celcius <h1>");
            res.write("<img src=" +imageURL+">");
            res.send();
        });
       
    });

});








app.listen(3000,function(){
    console.log("Server is running at port number 3000.");
});