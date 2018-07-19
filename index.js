var http = require('http');
var fs = require('fs');
$html = "";

const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
  uri: `https://www.shure.com/americas/support/find-an-answer/difference-between-a-dynamic-and-condenser-microphone`,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
  	 $html = $('.article__wysiwyg').html();
    console.log($html);
  
  }) 
  .catch((err) => {
    console.log(err);
  });

//writes to localhost
http.createServer(function (req, res) {
	fs.readFile('main.html', function(err,data){
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write(data);
    	res.write($html);
    	return res.end();
	});
}).listen(8080);


