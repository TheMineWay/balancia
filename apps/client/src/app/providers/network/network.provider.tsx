import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { WithChildren } from "src/common/types/component/component.types";

const queryClient = new QueryClient();

export default function NetworkProvider({ children }: Readonly<WithChildren>) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
