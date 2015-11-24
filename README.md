multimatcher
============

Install
-------

npm install multimatcher

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

matcher.find(array)
-------------------

Using **patterns** find all the file name strings that match.

```javascript
var m = new Matcher(['*.js']);
//Will print ['one.js', 'two.js']
console.log(m.find('one.js', 'two.js', 'three.xml']));
```

matcher.index(name)
-------------------

Find the index of name in **patterns**.

If the name string does not match a pattern then the returned value equals `-1`.

```javascript
var m = new Matcher(['*.xml', '*.js']);
//Will print 1
console.log(m.index('file.js'));
```
