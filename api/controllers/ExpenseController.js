/**
 * ExpenseController
 *
 * @description :: Server-side logic for managing expenses
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	// image: function(req, res) {
	// 	var urlData = req.query.url;
	// 	Expense.update({key: value}, {url: urlData}).exec(function(err, doc) {
	// 			return;
	// 	});
	// }
	   parseORM: function(req, res) {
	   	var url = 'https://www.idolondemand.com/sample-content/documents/hp_q1_2013.pdf';//S3 response
	   	var hpAPIBaseurl = 'https://api.idolondemand.com/1/api/async/ocrdocument/v1?url='
	   	var apikey = '29ea712d-bed0-4786-bc3e-20021704f652';
	   	var hpAPIFinalurl = hpAPIBaseurl + url + '&apikey=' + apikey;
	   	var amount = 100.0;
	   	var vendorName = 'Uber';
	   	var type = 'Travel';
	   	var approved = 'notApproved';
	   	var async = require('async');
	   	var request = require('request')
	   	request(hpAPIFinalurl,function(err, response, body){
	   		if(err) console.log(err);
	   		
	   		var parsed = JSON.parse(body);
	   		console.log(parsed.jobID);
	   		job = parsed.jobID
	   		var hpResulturl = 'https://api.idolondemand.com/1/job/result/' + job + '?apikey=' + apikey;
	   		console.log(hpResulturl);
	   		request(hpResulturl, function(err, response, body){

	   			if(err) console.log(err);
	   			var parsed1 = JSON.parse(body);
	   			console.log(parsed1);
	   			var ob = parsed1.actions[0].result.text_block[0].text;
	   			//console.log('text:',ob);

	   			var lines = ob.split('\n');
	   			_.forEach(lines, function(eachItem)
	   			{
	   				// console.log(eachItem);
	   				listOfWords = eachItem.split(' ');
	   				// console.log(words)
	   				var flag = 0;
	   				_.forEach(listOfWords, function(element){

	   					var e = element.toLowerCase();
	   					// console.log("the e is", e)
	   					if(e == 'cash'||e == 'amount' || e == 'due'|| e == 'total') {
	   					 	flag = 1;
	   					 	var r = /\d+.\d+/;
	   					 	amount = eachItem.match(r);
	   					 	console.log(amount);
	   					}
	   					
	   				});
	   					

	   			});
	   			
	   		});
	   		/*var text = body.content
	   		, vendorName = 'Vendor 123'
	   		, amount = '45'
	   		, type = 'Travel'
	   		, approved = 'notApproved';*/

	   		//Parser

	   		//Must type cast amount to float before sending?
	   		res.json({"vendorName":vendorName, "approved":approved, "type":type, "totalAmount":amount});
	   		// Putting this data in the next screen for verification by user
	   		// If verified, we put this data into an Expense object, using the expnese/create? endpoint
	   	});

	   }	
};

