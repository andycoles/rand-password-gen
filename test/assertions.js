var passwordGen = require('../src/passwordGen');
var charRange = passwordGen.genAsciiCharRangeArr;

var assertArr = [
    {length: 16},
    {length: 1},
    {length: 0},
    {length: null},
    {length: undefined},
    {length: 'string'},
    {length: 'string', exclusions: 'string'},
    {length: 'string', exclusions: ['1','2','3']},
    {length: 16, exclusions: 'string'},
    {length: 32},
    {length: 16, exclusions: charRange('a','z').concat(charRange('A', 'Z')).concat(charRange('0','9'))},
    {length: 1, exclusions: charRange('a','z').concat(charRange('A', 'Z')).concat(charRange('0','9'))},
    {length: 16, exclusions: ['(', '0','o', 'O', ')', '~', '\\', '/', '|', '}', '{', '[', ']', 'l', '1']},
    {length: 32, exclusions: charRange('a','z')},
    {length: 19, exclusions: ['a', 'b', 'c', 'd', 'e']},
    {length: 19, exclusions: ['a', 'a', 'a', 'a', 'a']},
    {length: 11, exclusions: ['2','4','6','8']}
];

module.exports = assertArr;
