module.exports = function(charFirst, charLast) {
    var arr = [],
        i = charFirst.charCodeAt(0),
        j = charLast.charCodeAt(0);
    for (; i <= j; ++i) {
        arr.push(String.fromCharCode(i));
    }
    return arr;
};
