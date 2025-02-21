import { UserModel } from "@shared/models";

type Options = {
  capitalize?: boolean;
};

export const getUserName = (
  { name, lastName }: Partial<UserModel>,
  options: Options = { capitalize: true }
) => {
  const { capitalize: shouldCapitalize } = options;

  return [name, ...(lastName?.split(" ") ?? [])]
    .filter(Boolean)
    .map((text) => (shouldCapitalize ? capitalize(text!) : text))
    .join(" ");
};

const capitalize = (text: string) => {
  return text[0].toUpperCase() + text.toLowerCase().slice(1);
};
