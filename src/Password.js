'use-strict';
var charRange = require('./util/genAsciiCharRangeArr');

function Password(options) {
    var possibleCharsAfterExcl,
        necessaryChars = 0,
        charArr = [];

    this.DEFAULT_OPTIONS = {
        // ASCII character decimal range, i.e. all printable chars excluding Space and Delete
        charMin: 33,
        charMax: 126,
        length: 16,
        // What chars cannot be in password - custom
        exclusions: ['(', '0', 'o', 'O', ')', '~', '\\', '/', '|', '}', '{', '[', ']', 'l', '1']
    };

    this.options = Object.assign({}, this.DEFAULT_OPTIONS, options);

    var firstPosCharBeforeExcl = String.fromCharCode(this.options.charMin),
        lastPosCharBeforeExcl = String.fromCharCode(this.options.charMax);

    if (typeof this.options.length !== 'number') {
        console.error('Password: invalidParameter in options: "length" must be of type number');
        return false;
    }
    if (this.options.exclusions && this.options.exclusions.constructor !== Array) {
        console.error('Password: invalidParameter in options: "exclusions" must be an Array');
        return false;
    }
    if (typeof this.options.inclusionRules !== 'undefined' && this.options.inclusionRules.constructor === Array) {
        // final inclusions, exclusions taking precedent
        this.options.inclusionRules.forEach(function(rule) {
            rule.charSet = this.arrDiff(rule.charSet, this.options.exclusions);
            rule.finalChars = [];
            for (var i = 0; i < rule.minNumChars; i++) {
                necessaryChars += 1;
                rule.finalChars.push(rule.charSet[this.getRandomIntInclusive(0, rule.charSet.length - 1)]);
            }
        }.bind(this));
        if (this.options.length < necessaryChars) {
            console.error('Password: invalidParameter in options: "length" and ' +
                "inclusionRules" you cannot specify a password of ' +
                this.options.length + '. Since you have ' + necessaryChars.length +
                ' characters required in your inclusionRules option.');
            return false;
        }
        this.options.inclusionRules.forEach(function(rule) {
            rule.finalChars.forEach(function(char) {
                charArr.push(char);
            });
        });
    }

    possibleCharsAfterExcl = this.arrDiff(charRange(firstPosCharBeforeExcl, lastPosCharBeforeExcl), this.options.exclusions);

    for (i = 0; i < (this.options.length - necessaryChars); i++) {
        charArr.push(possibleCharsAfterExcl[this.getRandomIntInclusive(0, possibleCharsAfterExcl.length - 1)]);
    }

    charArr = this.arrShuffle(charArr);
    this.password = charArr.join('');
}

Password.prototype = {
    // substract arr2 from arr1
    arrDiff: function(arr1, arr2) {
        return arr1.filter(function(itemA) {
            var pass = true;
            arr2.forEach(function(itemB) {
                if (itemB === itemA) {
                    pass = false;
                }
            });
            return pass;
        });
    },
    // Fisher-Yates shuffle, rand permutation of finite set arr
    arrShuffle: function(arr) {
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
    },
    // get random integer from min to max including min and max
    getRandomIntInclusive: function(min, max) {
        var min = Math.ceil(min),
            max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // get the password string
    get: function() {
        return this.password;
    }
};

module.exports = Password;
