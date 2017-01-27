var password = require('../../src/password'),
    assertions = require('./assertions2'),
    charRange = require('../../src/util/genAsciiCharRangeArr');

assertions.forEach(function(assert) {
    var pw = password(assert);
    var exl = assert.exclusions;
    var inc = assert.inclusionRules;
    var assertStr = 'password of length ' + assert.length + '. ';
    if (exl && exl.constructor === Array) {
        assertStr += 'excluded characters: ' + exl.join(',') + '. ';
    }
    if (inc && inc.constructor === Array) {
        assertStr += 'inclusion rules present. (check assertions) ';
    }
    if (pw) {
        assertStr += 'password: ' + pw;
    }
    describe(assertStr,
        function() {
            it('returns a password where exlusions specified are not present', function() {
                if (pw && assert.length && exl) {
                    expect(pw.length).toBe(assert.length);
                    exl.forEach(function(char) {
                        expect(pw.indexOf(char)).toBe(-1);
                    });
                }
            });

            it('returns a password of specified length', function() {
                if (pw && assert.length) {
                    expect(pw.length).toBe(assert.length);
                }
            });

            it('does not return a password if invalid params are passed', function() {
                if (assert.length === null || typeof assert.length === ('undefined' || 'string')) {
                    expect(pw).toBe(false);
                }
            });

            it('returns a password respecting inclusion rules specified', function() {
                if (pw && assert.length && inc) {
                    inc.forEach(function(rule) {
                        for (var i = 0; i < rule.minNumChars; i++) {
                            var count = 0;
                            for (var j = 0; j < pw.length; j++) {
                                for (var k = 0; k < rule.charSet.length; k++) {
                                    if (pw[j] === rule.charSet[k]) {
                                        count += 1;
                                    }
                                }
                            }
                            expect(count >= rule.minNumChars);
                        }
                    });
                }
            });

            console.log(assertStr);
            console.log('__________________________________________________');

        });

});
