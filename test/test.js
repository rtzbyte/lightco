'use strict'

var fs = require('fs')
var request = require('request')
var should = require('should')
var lightco = require('../')

var immediatelyInvoke = function (cb) {
	cb('hi!')
}


describe("lightco", function () {
	it("callback", function (done) {
		lightco.run(function* ($) {
			var [data] = yield immediatelyInvoke($)
			data.should.be.String()

			var [error, data] = yield fs.readFile('index.js', 'utf8', $)
			should.equal(error, null)
			data.should.be.String()

			var [error, response, body] = yield request('http://www.baidu.com', $)
			should.equal(error, null)
			data.should.be.String()

			yield request('http://www.baidu.com', function (error, response, body) {
				should.equal(error, null)
				data.should.be.String()
				done()
			})
		})
	})

	var query = function (value) {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				if (!value)
					return reject(new Error('obj not exist!'))
				resolve(value)
			}, 10)
		})
	}

	it("promise", function (done) {
		var fn = lightco.wrap(function* ($, value) {
			var [error, data] = yield query('secret')
			should.equal(error, null)
			data.should.be.equal('secret')

			var [error, data] = yield query()
			error.should.be.Error()

			return value
		})
		fn('secret').then(function (value) {
			value.should.be.equal('secret')
			done()
		})
	})

	it("warp bind this", function (done) {
		var fn = lightco.wrap(function* ($, value) {
			return this
		}).bind('secret')
		fn().then(function (value) {
			value.should.be.equal('secret')
			done()
		})
	})

	it("await callback", async function () {
		var [err, data] = await lightco(function* ($) {
			return yield fs.readFile('index.js', 'utf8', $)
		})
		should.equal(err, null)
		data.should.be.String()
	})
	
	it("await promise resolve", async function () {
		var [err, data] = await lightco(function* ($) {
			return yield new Promise((resolve, reject) => resolve('secret'))
		})
		should.equal(err, null)
		data.should.be.equal('secret')
	})

	it("await promise reject", async function () {
		var [err, data] = await lightco(function* ($) {
			return yield new Promise((resolve, reject) => reject(new Error('obj not exist!')))
		})
		err.should.be.Error()
		should.equal(data, null)
	})

	it("catch error inside", function (done) {
		lightco(function* ($) {
			try {
				null()
			} catch (error) {
				error.should.be.Error()
				done()
			}
		})
	})

	it("catch error outside", function (done) {
		lightco(function* ($) {
			null()
		}).catch(function (error) {
			error.should.be.Error()
			done()
		})
	})
})
