multimatcher
============

Install
-------

`npm install multimatcher`

News
----

Version 2 of `multimatcher` has breaking changes. There is now an options argument, and the default for matching basename was true, but is now false.

Usage
-----

```javascript
var Matcher = require("multimatcher");

var m = new Matcher(["*.js"]);

m.test("file.js"); //returns true

m.test("file.txt"); //returns false

```

The Match Array
---------------

The array passed to the **Matcher** constructor can be:

-	glob pattern
-	RegExp
-	String that matches the end of a path

```javascript
var Matcher = require("multimatcher");

var m = new Matcher([
    //Only one of these needs to match.
    "*.js",     //glob
    /\.js$/,    //RegExp
    '.js']);    //End of file name string.

m.test("file.js"); //returns true

m.test("file.txt"); //returns false

```

The end of the string matcher can be `.js`, `file.js`, or `le.js`. As long as it's an end of a file name.

Longer names will be more precise.

Just In Case
------------

The order of patterns checking is:

1.	RegExp
2.	glob pattern
3.	End of file name string

API
---

### multimatcher(array, options) -> matcher

The first argument to `multimatcher` should be an array of regular expression, glob strings, or path names.

The `options` argument should be the same as [minimatch](https://www.npmjs.com/package/minimatch), and will only be used to control glob patterns.

### matcher.find(array)

Using **patterns** find all the file name strings that match.

```javascript
var m = new Matcher(['*.js']);
//Will print ['one.js', 'two.js']
console.log(m.find('one.js', 'two.js', 'three.xml']));
```

### matcher.index(name)

Find the index of name in **patterns**.

If the name string does not match a pattern then the returned value equals `-1`.

```javascript
var m = new Matcher(['*.xml', '*.js']);
//Will print 1
console.log(m.index('file.js'));
```

### matcher.indexes(name)

Find all the indexes of name in **patterns**.

If the name string does not match an empty array is returned.

If there are matches an array of indexes returned.

```javascript
var m = new Matcher(['*.js', '*.xml', '*.js']);
//Will print [0, 2]
console.log(m.indexes('file.js'));
//Will print []
console.log(m.indexes("I don't match."));
```
