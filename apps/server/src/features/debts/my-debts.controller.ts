import { Controller } from "@nestjs/common";
import { getController, MY_DEBTS_CONTROLLER } from "@shared/api-definition";
import { DebtsService } from "src/features/debts/debts.service";

@Controller(getController(MY_DEBTS_CONTROLLER, {}))
export class MyDebtsController {
	constructor(private readonly debtsService: DebtsService) {}
}
