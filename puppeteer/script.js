module.exports = function (ele, page) {
    this.ele = ele;
    this.page = page;

    this.exeScript = async function() {
    	var ele = this.ele;
    	var page = this.page;

        if(ele.type == "get_html") {
            let selector = ele.selector;
            await page.waitForNavigation();

            return page.evaluate((selector) => {
                let table = document.querySelector(''+selector);
                if(table) return table.outerHTML;
                else return '';
            }, selector);
        }

	  	if(ele.type == "visit") {
			let url = ele.url;
			return page.goto(ele.url);
		}

        if(ele.type == "reload") {
            let url = ele.url;
            await page.waitForNavigation();
            return page.goto(ele.url);
        }

		if(ele.type == "input") {
			let selector = ele.selector;
			let value = ele.value;

			return page.evaluate((selector, value) => {
				document.querySelector(''+selector).value = value;
			}, selector, value);
		}

        if(ele.type == "change") {
            let selector = ele.selector;
            let value = ele.value;

            await page.waitForSelector(selector);

            await page.evaluate((selector, value) => {
                document.querySelector(selector).className = value;
                document.querySelector(selector).click();
                return;
            }, selector, value);
        }

		if(ele.type == "submit") {
			let selector = ele.selector;
			let action = ele.action;

            page.waitForSelector(selector)
                .then(async () => {
                    if(action == "click") {
                        await page.click(selector);
                        return ;
                    }

                    if(action == "hover") {
                        return page.hover(selector);
                    }
				});
		}

        if(ele.type == "result") {
            return await page.evaluate(() => {
                let result = document.querySelector('#resultStats');

                if(result) return 'true';
                else return 'false';
            });
        }
	}
};