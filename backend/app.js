var express = require("express");
var app = express();

months = {
    0 : "Jan",
    1 : "Feb",
    2 : "Mar",
    3 : "Apr",
    4 : "May",
    5 : "Jun",
    6 : "Jul",
    7 : "Aug",
    8 : "Sep",
    9 : "Oct",
    10 : "Nov",
    11 : "Dec"
}

date = new Date();

day = date.getDate();
month = months[date.getMonth()];
year = date.getFullYear();
hour = date.getHours();
min = date.getMinutes();
sec = date.getSeconds();

time = `${day} ${month} ${year} ${hour}:${min}:${sec} GMT`

app.get("/time", function(req, res){
    res.send(time);
});

app.get("/surprise", function(req, res){
    res.send({surprise : "Hello World"});
});

app.listen(9000);
