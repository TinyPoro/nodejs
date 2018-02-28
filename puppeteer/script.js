module.exports = function (ele, page) {
    this.ele = ele;
    this.page = page;

    this.exeScript = async function() {
    	var ele = this.ele;
    	var page = this.page;

    	// await page.waitForNavigation();
    	
		console.log(ele);

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

            await page.on('console', msg => {
                console.log(msg.text());
            });

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
	}
}