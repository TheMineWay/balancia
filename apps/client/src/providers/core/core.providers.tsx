import AuthProvider from "@providers/core/auth/auth.provider";
import LanguageProvider from "@providers/core/language/language.provider";
import NetworkProvider from "@providers/core/network/network.provider";
import ThemeProvider from "@providers/core/theme/theme.provider";
import UIProviders from "@providers/core/ui/ui.providers";
import { WithChildren } from "@ts-types/common/component.types";

export default function CoreProviders({ children }: Readonly<WithChildren>) {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <UIProviders>
          <NetworkProvider>
            <AuthProvider>{children}</AuthProvider>
          </NetworkProvider>
        </UIProviders>
      </ThemeProvider>
    </LanguageProvider>
  );
}
