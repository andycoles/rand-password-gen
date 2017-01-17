var passwordGen = require('../src/passwordGen'),
    assertions = require('./assertions'),
    gen = passwordGen.generate,
    charRange = passwordGen.genAsciiCharRangeArr;

assertions.forEach(function(assert) {
    var exl = assert.exclusions;
    var pw = gen(assert.length, exl);
    var assertString;
    if (exl && exl.constructor === Array) {
        assertStr = 'password of length: ' + assert.length +
            ' excluded characters: ' + exl.join(',') + ': ' + pw;
    } else {
        assertStr = 'password of length: ' + assert.length + ': ' + pw;
    }
    test(assertStr,
        function() {
            if (pw && assert.length && exl) {
                expect(pw.length).toBe(assert.length);
                exl.forEach(function(char) {
                    expect(pw.indexOf(char)).toBe(-1);
                });
            } else if (pw && assert.length) {
                expect(pw.length).toBe(assert.length);
            } else if (assert.length === null || typeof assert.length === ('undefined' || 'string')) {
                expect(pw).toBe(false);
            }
        });
});
