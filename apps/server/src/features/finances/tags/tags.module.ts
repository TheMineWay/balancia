import { Module } from "@nestjs/common";
import { MyTagsController } from "src/features/finances/tags/my-tags.controller";
import { TagsRepository } from "src/features/finances/tags/repositories/tags.repository";
import { TagsService } from "src/features/finances/tags/tags.service";
import { TransactionsModule } from "src/features/finances/transactions/transactions.module";

@Module({
	controllers: [MyTagsController],
	providers: [TagsService, TagsRepository],
	exports: [TagsService],
	imports: [TransactionsModule],
})
export class TagsModule {}
