import DependencyTableItem from "@site/src/components/ui/dependencies-table/dependency-table-item";
import type { Dependency } from "@site/src/types/dependencies/dependency.type";
import type { DevProp } from "@site/src/types/dependencies/with-dev-prop.type";

type Props = {
	dependencies: Array<Dependency & DevProp>;
};

export default function DependencyTable({ dependencies }: Readonly<Props>) {
	return (
		<table>
			<tbody>
				<tr>
					<th>Code</th>
					<th>Name</th>
					<th>Homepage</th>
					<th>Alternatives</th>
					<th>Only development</th>
				</tr>
				{sort(dependencies).map((dependency) => (
					<DependencyTableItem dependency={dependency} key={dependency.code} />
				))}
			</tbody>
		</table>
	);
}

function sort(arr: Props["dependencies"]) {
	return arr.sort((a, b) => {
		if (a.isDevelopment !== b.isDevelopment) {
			return a.isDevelopment ? 1 : -1;
		}

		return a.code.localeCompare(b.code);
	});
}
