import { zodResolver } from "@hookform/resolvers/zod";
import { AUTO_ASSIGN_SCHEMA, AutoAssignTriggerType } from "@shared/models";
import { useForm } from "react-hook-form";
import z from "zod";

const SCHEMA = z.object({ ...AUTO_ASSIGN_SCHEMA.shape });

export const useAutoassignForm = () => {
	const form = useForm({
		resolver: zodResolver(SCHEMA),
		defaultValues: {
			criteria: {
				type: AutoAssignTriggerType.FIELD,
			},
		},
	});

	return { form };
};
