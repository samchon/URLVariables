import std = require("tstl");
import URLVariables = require("./index");

type Element = std.Entry<string, string>;

function main(): void
{
    //----
    // GENERATE URL-VARIABLES OBJECT
    //----
    let dict: URLVariables = new URLVariables();
    
    // FILL ELEMENTS
    dict.set("name", "Samchon (Jeongho Nam)");
    dict.set("age", "29"); // MUST BE STRING
    dict.set("git", "https://github.com/samchon/tstl");
    dict.set("homepage", "http://samchon.org");
    dict.set("memo", "Hello, I'm the best programmer in Korea.");
    dict.set("is_crazy", ""); // NO VALUE IS ALSO POSSIBLE

    // CONVERT THE URL-VARIABLES OBJECT TO URL-ENCODED STRING
	let url_encoded_str: string = dict.toString();
	console.log(url_encoded_str + "\n");

    //----
    // VALIDATIONS
    //----
    // CREATE A NEW URL-VARIABLES OBJECT 
    // BY PARSING THE URL-ENCODED STRING
    let vars: URLVariables = new URLVariables(url_encoded_str);

    // VALIDATE SIZE
    if (dict.size() != vars.size())
        throw new std.LengthError("Size are different.");

    // ALL ELEMENTS ARE EQUAL
    let equal: boolean = std.equal
    (
        dict.begin(), dict.end(), vars.begin(), 
        function (x: Element, y: Element): boolean
        {
            return x.first == y.first && x.second == y.second;
        }
    );
    if (equal == false)
        throw new std.LengthError("Elements are different.");

    //----
    // ACCESSORS
    //----
    // TWO URL-ENCODED STRINGS MUST BE SAME
    console.log("Same?:", url_encoded_str == vars.toString(), "\n");

    // ACCESS TO MEMBERS BY URLVariables.get()
    console.log
    (
        `${dict.get("memo")} \n` + 
        `I'm ${dict.get("name")} and ${dict.get("age")} years old. \n` +
        `I've published my libraries on: \n` +
        `  - GitHub: ${dict.get("git")} \n` +
        `  - Homepage: ${dict.get("homepage")} \n`
    );

    // TEST WHETHER SOME VARIABLES ARE REGISTERED OR NOT
    console.log("Am I crazy?:", dict.has("is_crazy"));
    console.log("Has name?:", dict.has("name"));
    console.log("Has nickname?:", dict.has("nickname"));
}
main();