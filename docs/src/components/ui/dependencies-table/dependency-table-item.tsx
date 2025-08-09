import DependencyTableAlternatives from "@site/src/components/ui/dependencies-table/dependency-table-alternatives";
import type { Dependency } from "@site/src/types/dependencies/dependency.type";
import type { DevProp } from "@site/src/types/dependencies/with-dev-prop.type";
import styles from "./dependency-table-item.module.css";

type Props = {
	dependency: Dependency & DevProp;
};

export default function DependencyTableItem({
	dependency: {
		name,
		code,
		url,
		docsUrl: homepageUrl,
		alternatives,
		isDevelopment,
	},
}: Readonly<Props>) {
	return (
		<tr>
			<td>{code}</td>
			<td>
				<a target="_blank" href={url}>
					{name}
				</a>
			</td>
			<td>
				{homepageUrl && (
					<a target="_blank" href={homepageUrl}>
						Link
					</a>
				)}
			</td>
			<td>
				{alternatives && (
					<DependencyTableAlternatives alternatives={alternatives} />
				)}
			</td>
			<td>
				<span
					style={{
						backgroundColor: isDevelopment
							? "var(--ifm-color-warning)"
							: "var(--ifm-color-primary)",
					}}
					className={styles.badge}
				>
					{isDevelopment ? "Yes" : "No"}
				</span>
			</td>
		</tr>
	);
}
