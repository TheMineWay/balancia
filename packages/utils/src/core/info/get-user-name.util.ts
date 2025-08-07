import { OidcProfileInfo } from "@shared/models";

type Options = {
	capitalize?: boolean;
};

export const getUserName = (
	{ name }: Partial<OidcProfileInfo>,
	options: Options = { capitalize: true },
) => {
	const { capitalize: shouldCapitalize } = options;

	return name
		?.trim()
		?.split(" ")
		.filter(Boolean)
		.map((text) => (shouldCapitalize && text ? capitalize(text) : text))
		.join(" ");
};

const capitalize = (text: string) => {
	return text[0].toUpperCase() + text.toLowerCase().slice(1);
};
