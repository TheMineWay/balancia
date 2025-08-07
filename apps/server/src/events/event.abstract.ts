export abstract class Event<T extends object> {
	constructor(
		public readonly name: string,
		public readonly payload: T,
	) {}
}
