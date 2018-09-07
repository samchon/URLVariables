import * as std from "tstl";
import * as URLVariables from "./index";

type Element = std.Entry<string, string>;

interface IAuthor
{
    name: string;
    age: number;
    git: string;
    homepage: string;
    memo: string;
    is_crazy: boolean;

    [key: string]: any;
}

function main(): void
{
    let author: IAuthor = 
    {
        name: "Samchon (Jeongho Nam)",
        age: 29,
        git: "https://github.com/samchon/tstl",
        homepage: "http://samchon.org",
        memo: "Hello, I'm the best programmer in Korea.",
        is_crazy: true
    };
    
    test_global(author);
    test_class(author);
}

function test_global(author: IAuthor): void
{
    //----
    // STRINGIFY & PARSE
    //----
    // STRINGIFY -> OBJECT TO URL-ENCODED STRING
    let url_encoded_str: string = URLVariables.stringify(author);

    console.log(url_encoded_str);
    console.log("----------------------------------\n");

    // PARSE -> URL-ENCODED STRING TO OBJECT
    let obj: IAuthor = URLVariables.parse(url_encoded_str, true);

    //----
    // VALIDATE
    //----
    // VALIDATE STRINGIFY
    if (url_encoded_str != URLVariables.stringify(obj))
        throw new std.DomainError("Error on URLVariables.decode().");

    // VALIDATE PARSE -> (AUTHOR == OBJ)?
    for (let key in author)
        if (author[key] != obj[key])
            throw new std.DomainError("Error on URLVariables.parse().");

    // PRINT A DYNAMIC OBJECT, CREATED BY URL-ENCODED STRING
    console.log("Re-generated Dynamic Object by url-encoding & decoding:\n");
    console.log(obj);
}

function test_class(author: IAuthor): void
{
    console.log("\n----------------------------------\n");

    //----
    // GENERATE URL-VARIABLES OBJECT
    //----
    let dict: URLVariables = new URLVariables();
    
    // FILL ELEMENTS
    dict.set("name", author.name);
    dict.set("age", String(author.age)); // MUST BE STRING
    dict.set("git", author.git);
    dict.set("homepage", author.homepage);
    dict.set("memo", author.memo);
    dict.set("is_crazy", String(author.is_crazy));

    // CONVERT THE URL-VARIABLES OBJECT TO URL-ENCODED STRING
    let url_encoded_str: string = dict.toString();

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
        throw new std.InvalidArgument("Elements are different.");

    // ALL ELEMENTS ARE EQUAL, THEN ENCODINGS MUST BE SAME
    if (dict.toString() != vars.toString())
        throw new std.DomainError("Error on URLVariables.toString().");

    //----
    // ACCESSORS
    //----
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