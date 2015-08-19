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
