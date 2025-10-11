import { Module } from "@nestjs/common";
import { MyTagsController } from "src/features/finances/tags/my-tags.controller";
import { TagAutoMatcherRepository } from "src/features/finances/tags/repositories/tag-auto-matcher.repository";
import { TagsRepository } from "src/features/finances/tags/repositories/tags.repository";
import { TagAutoMatcherService } from "src/features/finances/tags/tag-auto-matcher.service";
import { TagsService } from "src/features/finances/tags/tags.service";
import { TransactionsModule } from "src/features/finances/transactions/transactions.module";

@Module({
	controllers: [MyTagsController],
	providers: [
		TagsService,
		TagsRepository,

		// Automatcher
		TagAutoMatcherService,
		TagAutoMatcherRepository,
	],
	exports: [TagsService, TagAutoMatcherService],
	imports: [TransactionsModule],
})
export class TagsModule {}
