import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WithChildren } from "@ts-types/common/component.types.ts";

const queryClient = new QueryClient();

export default function NetworkProvider({ children }: Readonly<WithChildren>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
