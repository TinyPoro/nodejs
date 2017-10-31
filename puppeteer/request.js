// module.exports = {
//   sayHelloInEnglish: function() {
//     return "HELLO";
//   },

//   sayHelloInSpanish: function() {
//     return "Hola";
//   },

//   exeRequest: function(ele, page, response) {
//   	console.log("a");
//   	return "b";
//   	if(ele == 'header') {
//   		console.log("a");
// 	    return response.headers;
// 	}
			    	
// 	if(ele == 'cookie') {
// 		console.log("a");
// 		return page.cookies();				
// 	}

// 	if(ele == 'html') {
// 	console.log("a");	
// 		return page.content();
// 	}

	
//   },

//   exeRequest: function(ele, page, response) {
//  //  	if(ele == 'header') {
// 	//     return response.headers;
// 	// }
			    	
// 	// if(ele == 'cookie') {
// 	// 	return page.cookies();				
// 	// }

// 	// if(ele == 'html') {	
// 	// 	return page.content();
// 	// }
//   }
// };

module.exports = function (ele, page, response) {
    this.ele = ele;
    this.page = page;
    this.response = response;

    this.exeRequest = function() {
    	var ele = this.ele;
    	var page = this.page;
    	var response = this.response;

	  	if(ele == 'header') {
		    return response.headers;
		}
				    	
		if(ele == 'cookie') {
			return page.cookies();				
		}

		if(ele == 'html') {	
			return page.content();
		}	
	}
}
