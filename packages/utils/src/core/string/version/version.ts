/**
 * This class represents a semantic version.
 */
export class Version {
	private constructor(private readonly versionInfo: VersionInfo) {}

	public get info(): VersionInfo {
		return this.versionInfo;
	}

	public compareTo(version: Version): "EQ" | "GT" | "LT" {
		const toCompareInfo = version.info.version;

		for (let i = 0; i < this.info.version.length; i++) {
			const [original, toCompare] = [this.info.version[i], toCompareInfo[i]];

			if (original === toCompare) continue;
			if (original > toCompare) return "GT";
			if (original < toCompare) return "LT";
		}
		return "EQ";
	}

	public toString(): string {
		const { version, preRelease, buildMetadata } = this.versionInfo;
		const preReleaseStr = preRelease
			? [
					"-",
					preRelease.name,
					preRelease.version ? `.${preRelease.version}` : false,
				].filter(Boolean)
			: [];

		return [
			version.join("."),
			preRelease ? preReleaseStr.join("") : false,
			buildMetadata ? `+${buildMetadata}` : false,
		]
			.filter(Boolean)
			.join("");
	}

	/* Initialization */
	public static fromString(version: string): Version {
		return new Version(stringToInfo(version));
	}
}

/* Internal */

type VersionStore = [number, number, number];
type PreRelease = {
	name: string;
	version?: number;
};
type BuildMetadata = string;

type VersionInfo = {
	version: VersionStore;
	preRelease?: PreRelease;
	buildMetadata?: BuildMetadata;
};

/* Logic */

const stringToInfo = (v: string): VersionInfo => {
	const [versionInfo, buildMetadata] = v.split("+");
	const [version, preRelease] = versionInfo.split("-");

	const versionNums = version.split(".").map(Number);
	if (
		versionNums.length !== 3 ||
		versionNums.some(Number.isNaN) ||
		versionNums.some((num) => num < 0)
	) {
		throw new Error(`Invalid version: ${version}`);
	}

	const preReleaseInfo: PreRelease | undefined = preRelease
		? parsePreRelease(preRelease)
		: undefined;

	return {
		version: versionNums as VersionStore,
		preRelease: preReleaseInfo,
		buildMetadata,
	};
};

const parsePreRelease = (preRelease: string): PreRelease => {
	const [name, version] = preRelease.split(".");
	return { name, version: version ? Number(version) : undefined };
};
