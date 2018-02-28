const http = require('http');
// const url = require('url');
const qs = require('querystring');
const puppeteer = require('puppeteer');
const request = require('./request.js');
const script = require('./script.js');

http.createServer(async (req, res) => {
	res.writeHead(200, {"Content-Type": "application/json"});
	var params = "";

	// var u;  //url
    // var r;	//request
    var s;	//script
    // var reqArr;

	req.on('data', function (data) {
	  params += data;
	});

	req.on('end', async function () {
	  var post = qs.parse(params);
	  // u = post.url;
	  // r = post.request;
	  // reqArr = r.split(",");
	  s = JSON.parse(post.script);

	    var sttCode = res.statusCode;
		
		var obj;

	    if(sttCode == 200) {
	    	obj = {
	    		success : true,
	  			message : 'OK',
	  			data : {}
	    	}
	    	
	    	if(s) {
	    		const browser = await puppeteer.launch({headless:false});;
	    		const page = await browser.newPage();

	    		// const response = await page.goto(u);
                //
	    		// page.on('console', msg => console.log(msg['text']));
			  	//
			  	// const reqMod = new request(element, page, response);
                //
			  	// for(let i = 0; i < reqArr.length; i++){
			  	// 	var element = reqArr[i];
                //
	    		//
	    		// 	obj.data[""+element] = await reqMod.exeRequest();
	    		//
			  	// }

	    		//script
                for(let i = 0; i < s.length; i++) {
                    var ele = s[i];

                    var scrMod = new script(ele, page);
                    await scrMod.exeScript();
                }

	    	}   	
	    }
	    else {
	    	obj = {
		    	success : false,
		  		message : 'Không thể khởi động selenium/phantomjs/puppetee'
		    }
	    } 

	    var json = JSON.stringify(obj);

	  	res.end(json);
  	})
}).listen(8080);

