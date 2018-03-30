const http = require('http');
// const url = require('url');
const qs = require('querystring');
const puppeteer = require('puppeteer');
const request = require('./request.js');
const script = require('./script.js');

http.createServer(async (req, res) => {
	res.writeHead(200, {"Content-Type": "application/json"});
	var params = "";

    var s;	//script

	req.on('data', function (data) {
	  params += data;
	});

	req.on('end', async function () {
	  var post = qs.parse(params);
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

	    		//script
                for(let i = 0; i < s.length; i++) {
                    var ele = s[i];

                    var scrMod = new script(ele, page);

                    if(ele.type == 'get_html') {
                    	var html = await scrMod.exeScript();
                        res.end(html);
					}else if(ele.type == 'check_exist'){
                    	var urls = await scrMod.exeScript();

                    	await page.goto('http://spider.123dok.com:6769/site/create');

                        await page.evaluate(() => {
                            document.querySelector('#email').value = 'ngophuongtuan@gmail.com';
                            document.querySelector('#password').value = 'tinyporo1817';
                        });

                        await page.click('[type="submit"]');

                        try{
                        	await page.waitForNavigation({timeout:3000});
                        }catch(err){
                        	console.log(err.message);
						}
                        await page.goto('http://spider.123dok.com:6769/site/create');
                        var result = [];

                        urls.forEach(async function(url, index){
                        	let check = await page.evaluate((url) => {
                        		document.querySelector('#start_url').value = url;
                                let duplicate = document.querySelector('.list-report li input[type="radio"]');

                                if(duplicate == null) return true;
                                return false;
                            }, url);

                        	if(check) result.push(url);

							if(index == urls.length - 1) {
								var json_url = JSON.stringify(urls);
								res.end(json_url);
                            }
                        });
					}
                    else await scrMod.exeScript();
                }
	    	}   	
	    }
	    else {
	    	obj = {
		    	success : false,
		  		message : 'Không thể khởi động selenium/phantomjs/puppetee'
		    }
	    }
  	})
}).listen(8080);

