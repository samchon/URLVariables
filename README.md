# URLVariables
[![Build Status](https://travis-ci.org/samchon/URLVariables.svg?branch=master)](https://travis-ci.org/samchon/URLVariables)
[![npm version](https://badge.fury.io/js/url-variables.svg)](https://www.npmjs.com/package/url-variables)
[![Downloads](https://img.shields.io/npm/dm/url-variables.svg)](https://www.npmjs.com/package/url-variables)
[![DeepScan grade](https://deepscan.io/api/projects/1948/branches/8874/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=1948&bid=8874)
[![Chat on Gitter](https://badges.gitter.im/samchon/URLVariables.svg)](https://gitter.im/samchon/URLVariables?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

`URLVariables`, it's the most simple, concise and eledic library for URL-encoding & URL-decoding. 

To use `URLVariables`, just remember that below structure, then you'll understand how to use it. If you want to know more about the deatailed feature, then utilize auto-completion of TypeScript or read the [Guide Documents](https://github.com/samchon/URLVariables/wiki).

```typescript
class URLVariables extends std.HashMap<string, string>
{
    // CONSTRUCTORS & CONVERTERS
    public constructor();
    public constructor(url_encoded_str: string); // PARSE
    public toString(); // RETURNS URL-ENCODED STRING

    // ACCESSORS
    public has(key: string): boolean;
    public get(key: string): string;
    public set(key: string, value: string): string;
}
```

## Installation
### NPM Module
Installing **URLVariables**, it's very easy. Just install with the `npm`

```bash
# Install URLVariables from the NPM module
npm install --save url-variables
```

### Usage
In this section, we will study how to generate `URLVariables` object and convert the `URLVariables` object to the `URL-encoded string`. After that, we'll study how to parse the URL-encoded string and access to members of that `URLVariables` object.

If you want to know more about the deatiled features, then utilize auto-completion of TypeScript or read the [Guide Documents](https://github.com/samchon/URLVariables/wiki). If you want to know about the `std.HashMap`, base class of the `URLVariables`, then visit the [TSTL proejct](https://github.com/samchon/tstl).

#### example.ts
```typescript
import std = require("tstl");
import URLVariables = require("url-variables");

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
```

#### output
```txt
name=Samchon%20(Jeongho%20Nam)&age=29&git=https%3A%2F%2Fgithub.com%2Fsamchon%2Ftstl&homepage=http%3A%2F%2Fsamchon.org&memo=Hello%2C%20I'm%20the%20best%20programmer%20in%20Korea.&is_crazy

Same?: true

Hello, I'm the best programmer in Korea.
I'm Samchon (Jeongho Nam) and 29 years old.
I've published my libraries on:
  - GitHub: https://github.com/samchon/tstl
  - Homepage: http://samchon.org

Am I crazy?: true
Has name?: true
Has nickname?: false
```



## References
  - **Repositories**
    - [GitHub Repository](https://github.com/samchon/URLVariables)
    - [NPM Repository](https://www.npmjs.com/package/url-variables)
  - **Documents**
    - [**Guide Documents**](https://github.com/samchon/URLVariables/wiki)
    - [API Documents](http://samchon.github.io/URLVariables/api)
  - **Related Project**
    - [TSTL](https://github.com/samchon/tstl)