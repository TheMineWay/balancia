import { Module } from "@nestjs/common";
import { CategoriesService } from "src/features/finances/categories/categories.service";
import { MyCategoriesController } from "src/features/finances/categories/my-categories.controller";
import { CategoriesRepository } from "src/features/finances/categories/repositories/categories.repository";

@Module({
	controllers: [MyCategoriesController],
	providers: [CategoriesService, CategoriesRepository],
	exports: [CategoriesService],
})
export class CategoriesModule {}
