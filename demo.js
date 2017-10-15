'use-strict';
var pw = require('./src/password');
document.addEventListener('DOMContentLoaded', function() {
    var $textarea = document.getElementsByTagName('textarea')[0];
    var $button = document.getElementById('GenPassword');
    $button.addEventListener('click', function() {
        var t0 = performance.now();
        var opts = {
            length: 14,
            exclusions: ['(', '0','o', 'O', ')', '~', '\\', '/',
              '|', '}', '{', '[', ']', 'l', '1', ',', '.', '^',
              '`',"'", '"'],
            inclusionRules: [
                {
                    minNumChars: 3,
                    charSet: 'UPPERCASE'
                },
                {
                    minNumChars: 3,
                    charSet: 'LOWERCASE'
                },
                {
                    minNumChars: 2,
                    charSet: 'SPECIAL_CHAR'
                },
                {
                    minNumChars: 3,
                    charSet: 'DIGIT'
                }
            ]
        };
        $textarea.value = pw(opts) + '\n';
        var t1 = performance.now();
        console.log("generating the password and inserting it to a textarea took " + (t1 - t0) + " milliseconds.");
    });
})
