import AuthProvider from "@core/providers/auth/auth.provider";
import StoredAccountsProvider from "@core/providers/auth/stored-accounts.provider";
import LanguageProvider from "@core/providers/language/language.provider";
import ThemeProvider from "@core/providers/theme/theme.provider";
import UIProviders from "@core/providers/ui/ui.providers";
import { WithChildren } from "@core/types/common/component.types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function TestProviders({ children }: Readonly<WithChildren>) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <UIProviders>
          <NetworkProvider>
            <StoredAccountsProvider>
              <AuthProvider>{children}</AuthProvider>
            </StoredAccountsProvider>
          </NetworkProvider>
        </UIProviders>
      </ThemeProvider>
    </LanguageProvider>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for faster tests
      staleTime: 0, // Ensure data is always considered stale
    },
  },
});

const NetworkProvider = ({ children }: WithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
