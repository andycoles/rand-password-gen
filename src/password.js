'use-strict';
var charRange = require('./util/genAsciiCharRangeArr');

function password(options) {
    var possibleCharsAfterExcl,
        necessaryChars = 0,
        charArr = [];

    var DEFAULT_OPTIONS = {
        // ASCII character decimal range, i.e. all printable chars excluding Space and Delete
        charMin: 33,
        charMax: 126,
        length: 16,
        // What chars cannot be in password - custom
        exclusions: ['(', '0', 'o', 'O', ')', '~', '\\', '/', '|', '}', '{', '[', ']', 'l', '1']
    };

    var options = Object.assign({}, DEFAULT_OPTIONS, options);

    var firstPosCharBeforeExcl = String.fromCharCode(options.charMin),
        lastPosCharBeforeExcl = String.fromCharCode(options.charMax);

    if (typeof options.length !== 'number') {
        console.error('Password: invalidParameter in options: "length" must be of type number');
        return false;
    }
    if (options.exclusions && options.exclusions.constructor !== Array) {
        console.error('Password: invalidParameter in options: "exclusions" must be an Array');
        return false;
    }
    if (typeof options.inclusionRules !== 'undefined' && options.inclusionRules.constructor === Array) {
        // final inclusions, exclusions taking precedent
        options.inclusionRules.forEach(function(rule) {
            rule.charSet = _arrDiff(rule.charSet, options.exclusions);
            rule.finalChars = [];
            for (var i = 0; i < rule.minNumChars; i++) {
                necessaryChars += 1;
                rule.finalChars.push(rule.charSet[_getRandomIntInclusive(0, rule.charSet.length - 1)]);
            }
        });
        if (options.length < necessaryChars) {
            console.error('Password: invalidParameter in options: "length" and ' +
                '"inclusionRules" you cannot specify a password of ' +
                options.length + '. Since you have ' + necessaryChars.length +
                ' characters required in your inclusionRules option.');
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

// Fisher-Yates shuffle, rand permutation of finite set arr
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
