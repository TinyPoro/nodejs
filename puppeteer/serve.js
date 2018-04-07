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
                const browser = await puppeteer.launch({headless:false});
                const page = await browser.newPage();

                //script
                for(let i = 0; i < s.length; i++) {
                    var ele = s[i];

                    var scrMod = new script(ele, page);

                    if(ele.type == 'get_html') {
                        var html = await scrMod.exeScript();
                        await res.end(html);
                    }
                    else await scrMod.exeScript();


                }
                setTimeout(()=> {browser.close();}, 5000);
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