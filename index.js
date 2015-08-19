var minimatch = require("minimatch"),
    cwd = process.cwd();

/*
git remote add origin https://github.com/hollowdoor/multimatcher.git
git push -u origin master
*/

module.exports = Matcher;

function Matcher(patterns){
    this.regexes = [];
    this.globs = [];
    this.strings = [];

    var tmp;

    for(var i=0, l=patterns.length; i<l; i++){
        if(patterns[i] instanceof RegExp){
            this.regexes.push(patterns[i]);
        }else if(typeof patterns[i] === 'string'){

            try{

                minimatch(cwd, patterns[i], {matchBase: true});
                this.globs.push(patterns[i]);
            }catch(e){
                tmp = (patterns[i] + '').replace(/[.?*+^$[\]\\(){}|-]/g, "\\$1") + '$';
                this.strings.push(new RegExp(tmp));
            }
        }else{
            throw new Error('argument 1 must be an instance of RegExp, a glob string, or plain string.');
        }

    }
}

Matcher.prototype.test = function(name){
    for(i=0,l=this.regexes.length; i<l; i++)
        if(this.regexes[i].test(name))
            return true;

    for(i=0,l=this.globs.length; i<l; i++)
        if(minimatch(name, this.globs[i], {matchBase: true}))
            return true;

    for(i=0,l=this.strings.length; i<l; i++)
        if(this.strings[i].test(name))
            return true;

    return false;
};

Matcher.prototype.find = function(names){
    var matched = [];

    for(var i=0; i<names.length; i++){
        if(this.test(names[i]))
            matched.push(names[i]);
    }

    return matched;
};
