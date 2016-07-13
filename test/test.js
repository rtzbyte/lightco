'use strict'

var fs = require('fs')
var request = require('request')
var lightco = require('../')


function requestGet(url, opts) {
	if (!opts) opts = {}
	return function(callback) {
		request(url, opts, callback)
	}
}

function readFile(filename) {
    return function(callback) {
	    fs.readFile(filename, 'utf8', callback);
    };
}


describe("lightco", function() {
	it("wrap", function(done) {
		var co = lightco.wrap(function* () {})
		done()
	});

	it("run", function(done) {
   		var co = lightco.run(function* () {
   			var [error, data] = yield readFile('index.js')
   			if (error)
   				throw error;

   			var [error, response, body] = yield requestGet('http://www.baidu.com')
			if (error)
   				throw error;
			done()
   		})
   	});
});
