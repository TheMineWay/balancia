import z from "zod";

export const nullableStringTransform = (val: string | null | undefined) => {
	if (val?.trim() === "") return null;
	return val;
};

type Options = {
	max?: number;
};

export const CREATE_NULLABLE_STRING_SCHEMA = ({
	max = Infinity,
}: Options = {}) =>
	z
		.string()
		.max(max)
		.nullable()
		.default(null)
		.transform(nullableStringTransform);
export type NullableString = z.infer<
	ReturnType<typeof CREATE_NULLABLE_STRING_SCHEMA>
>;
