import ScopedError, {
  ScopedErrorProps,
} from "@core/components/error/scoped/scoped-error";
import { LocaleContent } from "@core/i18n/locales/locales";
import { Alert } from "antd";

export default function ScopedAlertError<
  S extends keyof LocaleContent<"errors">,
>(props: Readonly<Omit<ScopedErrorProps<S>, "render">>) {
  return (
    <ScopedError
      render={({ title, message }) => (
        <Alert showIcon type="error" message={title} description={message} />
      )}
      {...props}
    />
  );
}
