'use strict'

var fs = require('fs')
var request = require('request')
var lightco = require('../')


describe("lightco-1", function() {
	it("wrap", function(done) {
		var co = lightco.wrap(function* ($) {
			console.log('\t this is lightco-1')
			var [error, data] = yield fs.readFile('index.js', 'utf8', $)
			if (error)
				throw error
			done()
		})
		co()
	})
})

describe("lightco-2", function() {
	it("run", function(done) {
		lightco.run(function* ($) {
			console.log('\t this is lightco-2')

			var [error, data] = yield fs.readFile('index.js', 'utf8', $)
			if (error)
				throw error
			console.log('\t step 1 -> done')

			var [error, response, body] = yield request('http://www.baidu.com', $)
			if (error)
				throw error
			console.log('\t step 2 -> done')

			yield request('http://www.baidu.com', function(error, response, body){
				if (error)
					throw error
				console.log('\t step 3 -> done')
				done()
			})
		})
	})
})
