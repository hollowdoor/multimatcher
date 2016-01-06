var minimatch = require("minimatch"),
    cwd = process.cwd();

/*
git remote add origin https://github.com/hollowdoor/multimatcher.git
git push -u origin master
*/

module.exports = Matcher;

function Matcher(patterns, options){
    this.regexes = [];
    this.globs = [];
    this.strings = [];

    this.options = options || {};

    var tmp;

    for(var i=0, l=patterns.length; i<l; i++){
        if(patterns[i] instanceof RegExp){
            this.regexes.push({
                pattern:patterns[i],
                index: i
            });
        }else if(typeof patterns[i] === 'string'){

            try{

                minimatch(cwd, patterns[i], this.options);
                this.globs.push({
                    pattern:patterns[i],
                    index: i
                });
            }catch(e){
                tmp = (patterns[i] + '').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$1") + '$';
                this.strings.push({
                    pattern:new RegExp(tmp),
                    index: i
                });
            }
        }else{
            throw new Error('argument 1 must be an instance of RegExp, a glob string, or plain string.');
        }

    }
}
//Keep this here for posterity.
/*Matcher.prototype.test = function(name){
    for(i=0,l=this.regexes.length; i<l; i++)
        if(this.regexes[i].pattern.test(name))
            return true;

    for(i=0,l=this.globs.length; i<l; i++)
        if(minimatch(name, this.globs[i].pattern, {matchBase: true}))
            return true;

    for(i=0,l=this.strings.length; i<l; i++)
        if(this.strings[i].pattern.test(name))
            return true;

    return false;
};*/

Matcher.prototype.test = function(name){
    return (this.index(name) !== -1);
};

Matcher.prototype.index = function(name){
    for(i=0,l=this.regexes.length; i<l; i++)
        if(this.regexes[i].pattern.test(name))
            return this.regexes[i].index;

    for(i=0,l=this.globs.length; i<l; i++)
        if(minimatch(name, this.globs[i].pattern, this.options))
            return this.globs[i].index;

    for(i=0,l=this.strings.length; i<l; i++)
        if(this.strings[i].pattern.test(name))
            return this.strings[i].index;

    return -1;
};

Matcher.prototype.find = function(names){
    var matched = [];

    for(var i=0; i<names.length; i++){
        if(this.test(names[i]))
            matched.push(names[i]);
    }

    return matched;
};
