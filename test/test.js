'use strict'

var fs = require('fs')
var request = require('request')
var should = require("should")
var lightco = require('../')

var immediatelyInvoke = function(cb) {
	cb('hi!')
}

describe("lightco", function() {
	it("callback", function(done) {
		lightco.run(function* ($) {
			var [data] = yield immediatelyInvoke($)
			data.should.be.String()

			var [error, data] = yield fs.readFile('index.js', 'utf8', $)
			should.equal(error, null)
			data.should.be.String()

			var [error, response, body] = yield request('http://www.baidu.com', $)
			should.equal(error, null)
			data.should.be.String()

			yield request('http://www.baidu.com', function(error, response, body){
				should.equal(error, null)
				data.should.be.String()
				done()
			})
		})
	})

	var query = function (exist) {
	    return new Promise(function (resolve, reject) {
			setTimeout(function () {
				if (!exist)
					return reject(new Error('obj not exist!'))

				resolve('see hellow!')
			}, 10)
	    })
	}

	it("promise", function(done) {
		lightco.run(function* ($) {
			var [error, data] = yield query(true)
			should.equal(error, null)
			data.should.be.String()

			var [error, data] = yield query()
			error.should.be.Error()
			done()
		})
	})
})
