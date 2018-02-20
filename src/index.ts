import std = require("tstl");

/**
 * URLVariables class is for representing variables of HTTP.
 * 
 * {@link URLVariables} class allows you to transfer variables between an application and server.
 * 
 * When transfering, {@link URLVariables} will be converted to a *URI* string.
 * - URI: Uniform Resource Identifier
 * 
 * @reference http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/net/URLVariables.html
 * @author Migrated by Jeongho Nam <http://samchon.org>
 */
class URLVariables extends std.HashMap<string, string>
{
	/**
	 * Default Constructor.
	 */
	public constructor();

	/**
	 * Construct from a URL-encoded string.
	 * 
	 * The {@link decode decode()} method is automatically called to convert the string to properties of the {@link URLVariables} object.
	 * 
	 * @param str A URL-encoded string containing name/value pairs.
	 */
	public constructor(str: string);

	public constructor(str: string = "")
	{
		super();

		if (str != "")
			this._Parse(str);
	}

	/**
	 * @hidden
	 */
	private _Parse(str: string): void
	{
		this.clear();
		if (str.trim() == "")
			return;
			
		if (str.indexOf("?") != -1)
			str = str.substr(str.indexOf("?") + 1);
		if (str.indexOf("#") != -1)
			str = str.substr(0, str.indexOf("#"));

		var elements: string[] = str.split("&");
		for (let pair of elements)
		{
			let equal_index: number = pair.indexOf("=");
			let key: string;
			let value: string;

			if (equal_index == -1)
			{
				key = pair;
				value = "";
			}
			else
			{
				key = pair.substr(0, equal_index);
				value = decodeURIComponent(pair.substr(equal_index + 1));
			}

			this.emplace(key, value);
		}
	}

	/**
	 * Returns a string containing all enumerable variables, in the MIME content encoding application/x-www-form-urlencoded.
	 */
	public toString(): string
	{
		let str: string = "";

		for (let it = this.begin(); !it.equals(this.end()); it = it.next())
		{
			if (std.not_equal_to(it, this.begin()))
				str += "&";

			str += it.first;
			if (it.second != "") 
				str+= "=" + encodeURIComponent(it.second);
		}
		return str;
	}
}

namespace URLVariables
{
	export type Iterator = std.HashMap.Iterator<string, string>;
	export type ReverseIterator = std.HashMap.ReverseIterator<string, string>;

	export type iterator = Iterator;
	export type reverse_iterator = ReverseIterator;

	export function parse(str: string): URLVariables
	{
		return new URLVariables(str);
	}
	
	export function stringify(variables: URLVariables): string
	{
		return variables.toString();
	}
}

export = URLVariables;