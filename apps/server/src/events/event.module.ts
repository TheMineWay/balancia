import { Global, Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { EventService } from "src/events/event.service";

@Global()
@Module({
  providers: [EventService],
  exports: [EventService],
  imports: [
    EventEmitterModule.forRoot({
      global: false,
    }),
  ],
})
export class EventModule {}
