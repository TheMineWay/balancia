import { Language } from "@i18n/language.enum.ts";
import { expect, it } from "vitest";

function isValidLanguageCode(name: string): boolean {
  // Match language codes, optionally with a region subtag
  return /^[a-z]{2}(-[A-Z]{2})?$/.test(name);
}

it("All locales defined in the Language enum should follow the language code naming strategy", () => {
  Object.values(Language).forEach((code) =>
    expect(isValidLanguageCode(code)).toBe(true)
  );
});
