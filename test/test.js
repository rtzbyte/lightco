'use strict'

var fs = require('fs')
var request = require('request')
var lightco = require('../')


describe("lightco-1", function() {
	it("wrap", function(done) {
		var co = lightco.wrap(function* ($) {
			console.log('this is lightco-1')
			var [error, data] = yield fs.readFile('index.js', 'utf8', $)
			if (error)
				throw error
			console.log(error)

			var [error, response, body] = yield request('http://www.baidu.com', $)
			if (error)
				throw error
			console.log(error, response.statusCode)
			done()
		})
		co()
	});
});

describe("lightco-2", function() {
	it("run", function(done) {
		lightco.run(function* ($) {
			console.log('this is lightco-2')
			var [error, data] = yield fs.readFile('index.js', 'utf8', $)
			if (error)
				throw error
			console.log(data)

			var [error, response, body] = yield request('http://www.baidu.com', $)
			if (error)
				throw error
			console.log(error, response.statusCode)
			done()
		})
	});
});
