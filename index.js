'use strict'

var lightco = {}

lightco.wrap = function(gen) {
    var idt = gen(resume)

    function resume() {
        // avoid can not throw error in Promise callback
        // avoid error of Generator is already running
        var args = arguments
        process.nextTick(function() {
            var obj = idt.next(args).value
            if (obj && isPromise(obj))
                obj.then(res=>resume(null, res), err=>resume(err))
        })
    }
    return resume
}

lightco.run = function(gen) {
    lightco.wrap(gen)()
}


//this function study from co
function isPromise(obj) {
    return 'function' == typeof obj.then;
}


module.exports = lightco
