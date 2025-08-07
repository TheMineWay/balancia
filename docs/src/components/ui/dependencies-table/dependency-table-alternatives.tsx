import { BasicDependency } from "@site/src/types/dependencies/basic-dependency.type";

type Props = {
	alternatives: Array<BasicDependency>;
};

export default function DependencyTableAlternatives({
	alternatives,
}: Readonly<Props>) {
	return (
		<div className="flex gap-2">
			{alternatives.map((alternative) => (
				<Alternative alternative={alternative} key={alternative.code} />
			))}
		</div>
	);
}

const Alternative = ({
	alternative: { name, url },
}: Readonly<{ alternative: BasicDependency }>) => {
	return (
		<a target="_blank" href={url}>
			{name}
		</a>
	);
};
