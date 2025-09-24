import { zodResolver } from "@hookform/resolvers/zod";
import {
	AUTO_ASSIGN_CREATE_SCHEMA,
	type AutoAssignCreateModel,
	AutoAssignTriggerType,
} from "@shared/models";
import { type UseFormReturn, useForm } from "react-hook-form";
import z from "zod";

const SCHEMA = z.object({ ...AUTO_ASSIGN_CREATE_SCHEMA.shape }).required();

export const useAutoassignForm = () => {
	const form: UseFormReturn<AutoAssignCreateModel> = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: {
			criteria: {
				type: AutoAssignTriggerType.FIELD,
			},
		},
	});

	return { form };
};
