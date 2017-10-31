module.exports = function (ele, page) {
    this.ele = ele;
    this.page = page;

    this.exeScript = function() {
    	var ele = this.ele;
    	var page = this.page;
    	

	  	if(ele.type == "visit") {
			let url = ele.url;
			return page.goto(ele.url);
		}

		if(ele.type == "input") {
			let selector = ele.selector;
			let value = ele.value;

			return page.evaluate((selector, value) => {
				document.querySelector(''+selector).value = value;
			}, selector, value);
		}

		if(ele.type == "submit") {
			let selector = ele.selector;
			let action = ele.action;

			if(action == "click") {
			  	return page.click(selector);
			}

			if(action == "hover") {
			  	return page.hover(selector);
			}	
		}
	}
}