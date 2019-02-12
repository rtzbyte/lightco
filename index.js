'use strict'

const slice = Array.prototype.slice
const unshift = Array.prototype.unshift

module.exports = lightco

lightco.wrap = function (gen) {
    return creator
    function creator() {
        var args = slice.call(arguments)
        return lightco.call(this, gen, args)
    }
}

lightco.run = function (gen) {
    lightco(gen)
}

function lightco(gen, args) {
    let ctx = this
    args = args || []
    return new Promise(function (resolve, reject) {
        if (typeof gen === 'function') {
            unshift.call(args, resume)
            gen = gen.apply(ctx, args)
        }
        if (!gen || typeof gen.next !== 'function') 
            return resolve(gen)
        function resume() {
            let args = arguments
            setImmediate(function () {
                try {
                    padding(gen.next(args))
                } catch (e) {
                    reject(e)
                }
            })
            function padding(ret) {
                let value = ret.value;
                if (ret.done) return resolve(value);
                isPromise(value) && value.then(res => resume(null, res), err => resume(err))
            }
        }
        resume();
    })
}

function isPromise(obj) {
    return obj && 'function' == typeof obj.then
}