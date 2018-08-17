var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');

//declarations
var arr; //establishes app for express 
var app = express();

//empty strings to fill later
$html = ""; 
$main = "";

const rp = require('request-promise');
const cheerio = require('cheerio');

//file dec 
fs = require('fs');

//to-do: file io error
// cycle through urls properly 
var text = fs.readFileSync("./urls.txt").toString('utf-8');
var urlarr = text.split("\n");
console.log(urlarr[0]);

//test array 
var array = ["https://www.shure.com/americas/support/find-an-answer/difference-between-a-dynamic-and-condenser-microphone", "http://www.shure.com/americas/support/find-an-answer/what-is-the-difference-between-uhf-and-vhf-frequencies"];
var i = 0;

//load url html
const options = {
  uri: array[i],
  transform: function (body) {
    return cheerio.load(body);
  }
};

//place text of faq into empty html var
rp(options)
  .then(($) => {
  	 $html = $('.article__wysiwyg').html();
    //console.log($html);
  
  }) 
  .catch((err) => {
    console.log(err);
  });


//put custom html into empty main var (to display site)
fs.readFile("main.html", 'utf8', function(err,data){
  if(err){
    return console.log(err);
  } 
  $main = data;

});


//using express to render both main.html and faq text 
app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, '/main.html'));
  $render = $main + $html;
  res.send($render);
});



//display on local host 
app.listen(8080, function (){
  console.log('Server running at local host');
 });


//to-do:
// get response from main.html
// store responses
// undo, go back?
//go to a specific url 

