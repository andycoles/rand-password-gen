'use-strict';
var charRange = require('./util/genAsciiCharRangeArr');

// predefined charSet constants
var UPPERCASE = 'UPPERCASE',
    LOWERCASE = 'LOWERCASE',
    DIGIT = 'DIGIT',
    SPECIAL_CHAR = 'SPECIAL_CHAR';

var DEFAULT_OPTIONS = {
    // ASCII character decimal range, i.e. all printable chars excluding Space and Delete
    charMin: 33,
    charMax: 126,
    length: 32,
    // What chars and how many of each set should be in password
    exclusions: [],
    inclusionRules: [
        {
            minNumChars: 3,
            charSet: UPPERCASE
        },
        {
            minNumChars: 3,
            charSet: LOWERCASE
        },
        {
            minNumChars: 3,
            charSet: SPECIAL_CHAR
        },
        {
            minNumChars: 3,
            charSet: DIGIT
        }
    ]
};

function password(options) {
    var possibleCharsAfterExcl,
        necessaryChars = 0,
        charArr = [];

    var options = Object.assign({}, DEFAULT_OPTIONS, options);

    var firstPosCharBeforeExcl = String.fromCharCode(options.charMin),
        lastPosCharBeforeExcl = String.fromCharCode(options.charMax);

    if (typeof options.length !== 'number') {
        console.error('password: invalidParameter in options: "length" must be of type number');
        return false;
    }
    if (options.length < 14) {
        console.warn('password: passwords of character length less than 14 are not recommended');
    }
    if (options.exclusions && options.exclusions.constructor !== Array) {
        console.error('password: invalidParameter in options: "exclusions" must be an Array');
        return false;
    }
    if (typeof options.inclusionRules !== 'undefined' && options.inclusionRules.constructor === Array) {
        // final inclusions, exclusions taking precedent
        options.inclusionRules.forEach(function(rule) {
            // charSet can be represented as a string, not an array. If the array is a constant, provide cooresponding array, else use the string
            if (typeof rule.charSet === 'string' && rule.charSet.length > 1) {
                rule.charSet = _getCharSetFromConstant(rule.charSet);
            }
            rule.charSet = _arrDiff(rule.charSet, options.exclusions);
            // check that after exclusions there are still some characters to pull from this inclusionRule charSet
            if (rule.charSet.length <= 0) {
                console.error('password: invalidParamer in options: one of your inclusionRules were negated completetly by your exclusions');
                return false;
            }
            rule.finalChars = [];
            for (var i = 0; i < rule.minNumChars; i++) {
                necessaryChars += 1;
                rule.finalChars.push(rule.charSet[_getRandomIntInclusive(0, rule.charSet.length - 1)]);
            }
        });
        if (options.length < necessaryChars) {
            console.error('password: invalidParameter in options: "length" and ' +
                '"inclusionRules." inclusionRules character minimum cannot exceed length');
            return false;
        }
        options.inclusionRules.forEach(function(rule) {
            rule.finalChars.forEach(function(char) {
                charArr.push(char);
            });
        });
    }

    possibleCharsAfterExcl = _arrDiff(charRange(firstPosCharBeforeExcl, lastPosCharBeforeExcl), options.exclusions);

    for (i = 0; i < (options.length - necessaryChars); i++) {
        charArr.push(possibleCharsAfterExcl[_getRandomIntInclusive(0, possibleCharsAfterExcl.length - 1)]);
    }

    charArr = _arrShuffle(charArr);
    return charArr.join('');
}

function _getCharSetFromConstant(charSetStr) {
    var charSet;
    switch(charSetStr) {
        case UPPERCASE:
            charSet = charRange('A', 'Z');
            break;
        case LOWERCASE:
            charSet = charRange('a', 'z');
            break;
        case DIGIT:
            charSet = charRange('0', '9');
            break;
        case SPECIAL_CHAR:
            charSet = charRange('!', '/').concat(charRange(':', '@')).concat(charRange('[', '`')).concat(charRange('{', '~'));
            break;
        default:
            charSet = charSetStr;
    }
    return charSet;
}

// substract arr2 from arr1
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

// random permutation of character array set
function _arrShuffle(arr) {
    var currentIndex = arr.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    return arr;
}

// get random integer from min to max including min and max
function _getRandomIntInclusive(min, max) {
    var min = Math.ceil(min),
        max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = password;
