import { CallbackRender } from "@core-fts/callbacks/components/callback-render";
import AfterProviders from "@providers/after-providers";
import AuthProvider from "@providers/auth/auth.provider";
import DeviceInfoProvider from "@providers/device/device-info.provider";
import LanguageProvider from "@providers/language/language.provider";
import NetworkProvider from "@providers/network/network.provider";
import UIProviders from "@providers/ui/ui.providers";
import type { WithChildren } from "src/common/types/component/component.types";

export default function CoreProviders({ children }: Readonly<WithChildren>) {
  return (
    <DeviceInfoProvider>
      <LanguageProvider>
        <UIProviders>
          <NetworkProvider>
            <CallbackRender>
              <AuthProvider>
                <AfterProviders>{children}</AfterProviders>
              </AuthProvider>
            </CallbackRender>
          </NetworkProvider>
        </UIProviders>
      </LanguageProvider>
    </DeviceInfoProvider>
  );
}
