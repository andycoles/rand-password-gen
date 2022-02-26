#rand-password-gen
*** Please Note ***
This is not a cryptographically secure random password generator. It uses Math.random in its underlying random shuffling algorithm. *This is a personal breakable toy learning exercise and is not to be used in real life production settings*. It is better to use already established libraries for generating random strings.

Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

A simple, random password generator for Node.js and browsers.

## Installation

```sh
$ npm install rand-password-gen
$ npm test
```

## Usage
### from the browser

```js
var password = require('rand-password-gen');
var myNewPassword = password({length: 16});
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
        // password must include at least 3 upper-case letters
        {
            minNumChars: 3,
            charSet: 'UPPERCASE',
        },
        // password must include at least 3 lower-case letters
        {
            minNumChars: 3,
            charSet: 'LOWERCASE',
        },
        // password must include at least 1 number
        {
            minNumChars: 1,
            charSet: 'SPECIAL_CHAR'
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
            // 'UPPERCASE' | 'LOWERCASE' | 'DIGIT' | 'SPECIAL_CHAR'
            charSet: 'UPPERCASE',
        }
    ]
};
```

### Running tests

Install dev dependencies:

```sh
$ npm install && npm test
```

### Author

**Andy Coles**

* [github/andycoles](https://github.com/andycoles)

### License

Copyright © 2017, [Andy Coles](https://github.com/andycoles).
Released under the [MIT License](LICENSE).
