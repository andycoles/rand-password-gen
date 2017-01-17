'use-strict';

// ASCII character map number range
var CHAR_MIN = 33,
    CHAR_MAX = 126,
    MASTER_EXCLUSIONS = ['`', '.', ',', '-', '"', "'"];

function generate(length, exclusions) {
    var firstPosCharBeforeExcl = String.fromCharCode(CHAR_MIN),
        lastPosCharBeforeExcl = String.fromCharCode(CHAR_MAX),
        totalExclusions,
        possibleCharsAfterExcl,
        charArr = [];
    if (typeof length === 'undefined' || length === null) {
        console.error('you must specify a password length as first param');
        return false;
    }
    if (typeof length !== 'number') {
        console.error('first parameter: length must be of type number');
        return false;
    }
    if (exclusions && exclusions.constructor !== Array) {
        console.error('second parameter: exclusions must be an Array');
        return false;
    }
    if (typeof exclusions !== 'undefined' && exclusions.constructor === Array) {
        // es6 - remove duplicates with Set
        totalExclusions = new Set(MASTER_EXCLUSIONS.concat(exclusions));
    } else {
        totalExclusions = MASTER_EXCLUSIONS;
    }

    possibleCharsAfterExcl = _arrDiff(genAsciiCharRangeArr(firstPosCharBeforeExcl, lastPosCharBeforeExcl), totalExclusions);

    for (i = 0; i < length; i++) {
        charArr.push(possibleCharsAfterExcl[_getRandomIntInclusive(0, possibleCharsAfterExcl.length - 1)]);
    }

    return charArr.join('');
}

function _arrDiff(arr1, arr2) {
    return arr1.filter(function(itemA) {
        var pass = true;
        arr2.forEach(function(itemB) {
            if (itemB === itemA) {
                pass = false;
            }
        });
        return pass;
    });
}

function genAsciiCharRangeArr(charFirst, charLast) {
    var arr = [],
        i = charFirst.charCodeAt(0),
        j = charLast.charCodeAt(0);
    for (; i <= j; ++i) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
}

function _getRandomIntInclusive(min, max) {
    var min = Math.ceil(min),
        max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    generate: generate,
    genAsciiCharRangeArr: genAsciiCharRangeArr
};
