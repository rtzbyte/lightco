'use strict'

var lightco = {}

lightco.wrap = function(gen) {
    var idt = gen(cbchain)
    function cbchain() {
        idt.next(arguments)
    }
    return cbchain
}

lightco.run = function(gen) {
    lightco.wrap(gen)()
}

module.exports = lightco
