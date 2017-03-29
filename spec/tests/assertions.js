// assertions config
var charRange = require('../../src/util/genAsciiCharRangeArr');
module.exports = [
    {length: 16},
    {length: 1},
    {length: 0},
    {length: null},
    {length: undefined},
    {length: 'string'},
    {length: 'string', exclusions: 'string'},
    {length: 'string', exclusions: ['1','2','3']},
    {length: 32, exclusions: 'string'},
    {length: 32},
    {length: 32, exclusions: ['(', '0','o', 'O', ')', '~', '\\', '/', '|', '}', '{', '[', ']', 'l', '1']},
    {
        length: 36,
        exclusions: ['(', '0','o', 'O', ')', '~', '\\', '/', '|', '}', '{', '[', ']', 'l', '1', '2', '3', 'a', 'b', 'C'],
        inclusionRules: [
            {
                minNumChars: 3,
                charSet: charRange('A', 'Z'),
            },
            {
                minNumChars: 3,
                charSet: charRange('a', 'z'),
            },
            {
                minNumChars: 3,
                charSet: charRange('0', '9')
            }
        ]
    },
    {length: 20, exclusions: ['a', 'a', 'a', 'a', 'a']},
    {length: 11, exclusions: ['2','4','6','8']}
];
