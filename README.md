#rand-password-gen
A simple, random and secure password generator for Node.js and browsers.

## Installation

    $ npm install rand-password-gen
    $ npm i
    $ npm test

## Usage
### from the browser

    ```js
    var password = require('rand-password-gen');
    var myNewPassword = password({length: 16})
    // -> e.g. xc00K8196#>2LS\Y
    ```

### Customize by passing array of characters to exclude from password.

    ```js
    var password = require('rand-password-gen');
    var options = {
        length: 16,
        exclusions: ['(', '0','o', 'O', ')', '~', '\\', '/', '|', '}', '{', '[', ']', 'l', '1']
    };
    var myNewPassword = password(options);
    // -> e.g. Yk>N*ZCktFizQ_ZN
    ```

### Customize by passing array of inclusion rules.

    ```js
    var password = require('rand-password-gen');
    var charRange = require('rand-password-gen/src/util/genAsciiCharRangeArr');
    var options = {
        length: 19,
        exclusions: ['(', '0','o', 'O', ')', '~', '\\', '/', '|', '}', '{', '[', ']', 'l', '1', '2', '3', 'a', 'b', 'C'],
        inclusionRules: [
            // password must include at least 3 upper-case letter
            {
                minNumChars: 3,
                charSet: charRange('A', 'Z'),
            },
            // password must include at least 3 lower-case letter
            {
                minNumChars: 3,
                charSet: charRange('a', 'z'),
            },
            // password must include at least 1 number
            {
                minNumChars: 1,
                charSet: charRange('0', '9')
            }
        ]
    };
    var myNewPassword = password(options);
    // -> e.g. ;q4K=^fNUFJe#jEGjw4
    ```

### options *Object*.
    ```js
    var options = {
        // *number* - length of password
        length: 18,
        // *Array* - characters to exclude from password
        exclusions: ['(', '0','o', 'O', ')'],
        // *Array* - of objects that describe the inclusions rules, i.e. must have 3 upper-case letters
        inclusionRules:
        [
            // *Object*
            {
                // *number* - minimum number of characters of this set in password
                minNumChars: 3,
                // *Array* - characters randomly selected from this set for rule
                charSet: charRange('A', 'Z'),
            }
        ]
    };
    ```
