import { Dictionary } from "./internal/Dictionary";
import { HashMap } from "tstl/container/HashMap";
import { not_equal_to } from "tstl/functional/comparators";

export class URLVariables extends Dictionary<string>
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
			if (not_equal_to(it, this.begin()))
				str += "&";

			str += it.first;
			if (it.second != "") 
				str+= "=" + encodeURIComponent(it.second);
		}
		return str;
	}

	public toJSON(): string
	{
		return this.toString();
	}
}

export namespace URLVariables
{
	export type Iterator = HashMap.Iterator<string, string>;
	export type ReverseIterator = HashMap.ReverseIterator<string, string>;
	
	export function parse<T = any>(str: string, autoCase: boolean = true): T
	{
		let variables: URLVariables = new URLVariables(str);
		let ret: any = new Object() as T;

		for (let entry of variables)
		{
			if (!autoCase || entry.second == "")
			{
				ret[entry.first] = entry.second;
				continue;
			}

			if (entry.second == "")
				ret[entry.first] = true;
			else if (entry.second == "true" || entry.second == "false")
				ret[entry.first] = (entry.second == "true");
			else if (Number.isNaN(Number(entry.second)) == false)
				ret[entry.first] = Number(entry.second);
			else
				ret[entry.first] = entry.second;
		}
		return ret as T;
	}
	
	export function stringify<T = any>(obj: T): string
	{
		if (typeof obj == "boolean" || typeof obj == "number")
			return String(obj);
		else if (typeof obj == "string")
			return obj;
		else if (obj instanceof URLVariables)
			return obj.toString();

		let variables: URLVariables = new URLVariables();
		for (let key in obj)
			variables.set(key, String(obj[key]));

		return variables.toString();
	}
}