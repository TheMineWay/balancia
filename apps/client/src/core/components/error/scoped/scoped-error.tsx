import { LocaleContent } from "@core/i18n/locales/locales";
import { useTranslation } from "@core/i18n/use-translation";
import { AxiosError } from "axios";

export type ScopedErrorProps<S extends keyof LocaleContent<"errors">> = {
  scope: S;
  error?: Error | null;
  render?: (options: RenderOptions) => React.ReactNode;
};

type RenderOptions = {
  title?: string;
  message: string;
};

const defaultRender = (options: RenderOptions) => (
  <div>
    {options.title && <h1>{options.title}</h1>}
    <p>{options.message}</p>
  </div>
);

export default function ScopedError<S extends keyof LocaleContent<"errors">>({
  scope,
  error,
  render = defaultRender,
}: Readonly<ScopedErrorProps<S>>) {
  const { t } = useTranslation("errors");

  if (!error) return null;

  let errorDisplay = t().unknown;

  const errors = t()[scope] as Record<
    string,
    { Message: string; Title: string }
  >;

  if (
    error instanceof AxiosError &&
    error?.status &&
    Object.keys(errors).includes(error?.status.toString())
  ) {
    errorDisplay = errors[error.status];
  }

  return render({
    title: errorDisplay.Title,
    message: errorDisplay.Message,
  });
}
