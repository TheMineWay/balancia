import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function NetworkProvider({ children }: Readonly<WithChildren>) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
