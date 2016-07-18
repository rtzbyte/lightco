'use strict'

var lightco = {}

lightco.wrap = function(gen) {
    var idt = gen(resume)

    function onFulfilled(res) {
        //avoid can not throw error in Promise callback
        process.nextTick(function(){
            resume(null, res)
        })
    }

    function onRejected(err) {
        process.nextTick(function(){
            resume(err)
        })
    }

    function resume() {
        var obj = idt.next(arguments).value
        if (obj && isPromise(obj))
            obj.then(onFulfilled, onRejected)
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
