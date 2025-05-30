import { CallbackRender } from "@core/callbacks/callback-render";
import AfterProviders from "@core/providers/after-providers";
import AuthProvider from "@core/providers/auth/auth.provider";
import DeviceInfoProvider from "@core/providers/device/device-info.provider";
import LanguageProvider from "@core/providers/language/language.provider";
import NetworkProvider from "@core/providers/network/network.provider";
import ThemeProvider from "@core/providers/theme/theme.provider";
import UIProviders from "@core/providers/ui/ui.providers";
import type { WithChildren } from "@core/types/common/component.types";

export default function CoreProviders({ children }: Readonly<WithChildren>) {
  return (
    <DeviceInfoProvider>
      <LanguageProvider>
        <ThemeProvider>
          <UIProviders>
            <NetworkProvider>
              <CallbackRender>
                <AuthProvider>
                  <AfterProviders>{children}</AfterProviders>
                </AuthProvider>
              </CallbackRender>
            </NetworkProvider>
          </UIProviders>
        </ThemeProvider>
      </LanguageProvider>
    </DeviceInfoProvider>
  );
}
