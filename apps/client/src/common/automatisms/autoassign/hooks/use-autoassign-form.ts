import { zodResolver } from "@hookform/resolvers/zod";
import {
	AUTO_ASSIGN_CRITERIA_SCHEMA,
	AutoAssignTriggerType,
} from "@shared/models";
import { useForm } from "react-hook-form";

const SCHEMA = AUTO_ASSIGN_CRITERIA_SCHEMA;

export const useAutoassignForm = () => {
	const form = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: {
			type: AutoAssignTriggerType.FIELD,
		},
	});

	return { form };
};
