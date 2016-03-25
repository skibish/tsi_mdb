'use strict';

/**
 * Test date for valid format
 * @param  {Date}  d date object
 * @return {Boolean}   [description]
 */
exports.isDateValid = function(d) {
    return ( Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.getTime()) );
}
