import type { LocaleKey } from "@i18n/locales/locales";
import type { useTranslation } from "@i18n/use-translation";

export type TFunction<K extends LocaleKey> = ReturnType<
	typeof useTranslation<K>
>["t"];
