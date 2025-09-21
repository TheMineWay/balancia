import { Module } from "@nestjs/common";
import { MyTagsController } from "src/features/finances/tags/my-tags.controller";
import { TagAutomatcherRepository } from "src/features/finances/tags/repositories/tag-automatcher.repository";
import { TagsRepository } from "src/features/finances/tags/repositories/tags.repository";
import { TagAutomatcherService } from "src/features/finances/tags/tag-automatcher.service";
import { TagsService } from "src/features/finances/tags/tags.service";
import { TransactionsModule } from "src/features/finances/transactions/transactions.module";

@Module({
	controllers: [MyTagsController],
	providers: [
		TagsService,
		TagsRepository,

		// Automatcher
		TagAutomatcherService,
		TagAutomatcherRepository,
	],
	exports: [TagsService, TagAutomatcherService],
	imports: [TransactionsModule],
})
export class TagsModule {}
