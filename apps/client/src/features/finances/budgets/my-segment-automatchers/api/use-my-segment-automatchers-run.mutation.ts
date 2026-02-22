import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";
import { useTranslation } from "@i18n/use-translation";
import { notifications } from "@mantine/notifications";
import {
	getController,
	MY_BUDGET_AUTOMATIONS_CONTROLLER,
} from "@shared/api-definition";
import type { BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel } from "@shared/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMySegmentAutomatchersRunMutation = () => {
	const { t } = useTranslation("budget");
	const { request } = useAuthenticatedRequest();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			segmentId,
			filters,
		}: {
			segmentId: number;
			filters?: BudgetSegmentCategoryAutoMatcherRunMatchersFiltersModel;
		}) =>
			endpointMutation(
				MY_BUDGET_AUTOMATIONS_CONTROLLER,
				"runSegmentAutoMatchers",
				{ segmentId: segmentId.toString() },
				request,
			)({ query: filters ?? {} }),
		onSuccess: () => {
			notifications.show({
				title:
					t()["budget-segment-auto-matchers"].actions["run-auto-matchers"]
						.status.success.Title,
				message:
					t()["budget-segment-auto-matchers"].actions["run-auto-matchers"]
						.status.success.Message,
				color: "green",
			});

			queryClient.invalidateQueries({
				queryKey: [getController(MY_BUDGET_AUTOMATIONS_CONTROLLER, {})],
			});
		},
	});
};
