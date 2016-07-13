'use strict';

var lightco = {}

lightco.wrap: function(gen) {
    var idt = gen()
    var cbchain = function() {
        var step = idt.next(arguments)
        if (!step.done) step.value(cbchain)
    }
    return cbchain
}

lightco.run: function(gen) {
    lightco.wrap(gen)()
}

/**
 * Expose `lightco`.
 */

module.exports = lightco
