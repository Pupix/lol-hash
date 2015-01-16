(function () {
    "use strict";

    // Vars
    var exp      = module.exports;

    /**
     * Returns the hash of a single string (concat of section + name) e.g. EzrealMysticShot
     * @param {String} val
     * @param {Boolean|Number} hex
     * @returns {String|Number}
     */

    exp.stringHash = function (val, hex) {
        //Vars
        var hash  = 0,
            mask = 4026531840,
            i;

        for (i = 0; i < val.length; i += 1) {
            hash =  parseInt(val.toLowerCase().charCodeAt(i) + (16 * (hash >>> 0)), 10) >>> 0;
            if ((hash & mask) !== 0) {
                hash ^= hash & mask ^ ((hash & mask) >>> 24);
            }
        }
        return hex ? '0x' + hash.toString(16) : hash;
    };

    /**
     * Creates a hash from a section and a name
     * @param {String} section
     * @param {String} variable
     * @param {Boolean|Number} hex
     * @returns {String|Number}
     */

    exp.inibinHash = function (section, variable, hex) {
        //Vars
        var hash  = 0,
            mask = 65599,
            i;

        for (i = 0; i < section.length; i += 1) {
            hash =  parseInt(section.toLowerCase().charCodeAt(i) + mask * (hash >>> 0), 10) >>> 0;
        }
        hash = parseInt(65599 * (hash >>> 0) + 42, 10) >>> 0;
        for (i = 0; i < variable.length; i += 1) {
            hash = parseInt(variable.toLowerCase().charCodeAt(i) + mask * (hash >>> 0), 10) >>> 0;
        }
        return hex ? '0x' + hash.toString(16) : hash;
    };

}());