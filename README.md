#rand-password-gen
A simple, random and secure password generator for Node.js and browsers.

## Installation

    $ git clone https://github.com/andycoles/passwordGen
    $ cd passwordGen
    $ npm i
    $ npm run test

## Usage
### from the browser

    var pwGen = require('passwordGen');
    var myNewPassword = pwGen.generate(16);
    // -> e.g. xc00K8196#>2LS\Y

Customize by passing array of characters to exclude from password.

    var pwGen = require('passwordGen');
    var myNewPassword = pwGen.generate(16, ['(', '0','o', 'O', ')', '~', '\\', '/', '|', '}', '{', '[', ']', 'l', '1']);
    // -> e.g. Yk>N*ZCktFizQ_ZN
