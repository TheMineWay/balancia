import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Event } from "src/events/event.abstract";

@Injectable()
export class EventService {
	constructor(private readonly eventEmitter: EventEmitter2) {}

	public emit<T extends object>(event: Event<T>) {
		this.eventEmitter.emit(event.name, event);
	}
}
