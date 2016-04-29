var Matcher = require("../index.js");

var m = new Matcher(['*.js']);

console.log(m.test('thing/file.js'));

console.log(m.find(['file.txt', 'file.js']));

var m2 = new Matcher([/\.js$/]);

console.log(m2.test('thing/file.js'));

console.log(m2.find(['file.txt', 'file.js']));

var m3 = new Matcher(["file.js", "*.txt"]);

console.log(m3.test('thing/file.js'));

console.log(m3.find(['thing.txt', 'aname', 'space/file.js', 'thing/file.js']));

var m3 = new Matcher(['one', '*.js', 'one', '*.js']);

console.log(m3.indexes('one'));

console.log(m3.indexes('one.js'))
