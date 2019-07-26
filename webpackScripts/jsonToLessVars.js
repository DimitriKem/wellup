
"use strict";

function jsonToLessVars (obj, indent) {
    var less = "";
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            less += "@" + key + ":" + obj[key] + ";\n";
        }
    }

    var storedStrings = [];
    less = less.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, function (str) {
        var id = "___JTS" + storedStrings.length;
        storedStrings.push({id: id, value: str});
        return id;
    });

    less = less.replace(/[{\[]/g, "(").replace(/[}\]]/g, ")");

    storedStrings.forEach(function (str) {
        less = less.replace(str.id, str.value);
    });

    return less;
}

module.exports = jsonToLessVars;
