import { NamingStrategyExtension } from "@site/src/constants/naming/naming-strategy-extensions.constant";

type Props = {
  extensions: Array<NamingStrategyExtension>;
};

export default function ExtensionsTable({ extensions }: Readonly<Props>) {
  return extensions.map(
    ({
      extension,
      description,
      client = true,
      server = true,
      packages = true,
      onlyOnPackages = [],
    }) => (
      <tr key={extension}>
        <td>*.{extension}.*</td>
        <td>{description}</td>
        <td>{client ? "✅" : "❌"}</td>
        <td>{server ? "✅" : "❌"}</td>
        <td>
          {onlyOnPackages.length > 0 ? (
            <div>
              {onlyOnPackages.map((p) => (
                <span key={p}>{p}</span>
              ))}
            </div>
          ) : (
            <div>{packages ? "✅ (All)" : "❌"}</div>
          )}
        </td>
      </tr>
    )
  );
}
