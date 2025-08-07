import type { ZodSchema } from "zod";

type Options<S extends object> = {
	schema: ZodSchema<S>;
	urlMatcher: RegExp;
	onCallback: (data: S, schema: ZodSchema<S>) => Promise<void>;
};

export class Callback<S extends object> implements ICallback {
	constructor(private readonly options: Options<S>) {}

	public get urlMatcher() {
		return this.options.urlMatcher;
	}

	invoke = async () => {
		const url = new URL(window.location.href);
		const data = this.options.schema.parse(
			Object.fromEntries(url.searchParams.entries()),
		);
		this.options.onCallback(data, this.options.schema);
	};
}

export interface ICallback {
	invoke: () => Promise<void>;
	urlMatcher: RegExp;
}
