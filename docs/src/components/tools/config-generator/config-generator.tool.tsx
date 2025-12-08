import { BACKEND_CONFIG } from "@site/src/constants/config/backend-config";
import { Section } from "@site/src/constants/config/env-config.type";
import { FRONTEND_CONFIG } from "@site/src/constants/config/frontend-config";
import clsx from "clsx";
import type React from "react";
import { useState } from "react";
import styles from "./config-generator.tool.module.css";

enum Project {
	FRONTEND = "frontend",
	BACKEND = "backend",
}

/**
 * A tool for generating configuration files for different projects.
 */
export const ConfigGeneratorTool: React.FC = () => {
	const [project, setProject] = useState<Project>(Project.FRONTEND);

	return (
		<div className={styles.tool}>
			<select
				value={project}
				onChange={(e) => setProject(e.target.value as Project)}
			>
				<option value="frontend">💻 Frontend</option>
				<option value="backend">☕ Backend</option>
			</select>

			<div className="card">
				<div className={clsx("card__body", styles["config-form"])}>
					<h2>
						{project === Project.FRONTEND
							? "Frontend Configuration"
							: "Backend Configuration"}
					</h2>
					<Tool
						schema={
							project === Project.FRONTEND ? FRONTEND_CONFIG : BACKEND_CONFIG
						}
					/>
				</div>
			</div>
		</div>
	);
};

type ToolProps = {
	schema: Section[];
};

const Tool: React.FC<ToolProps> = ({ schema }) => {
	return <></>;
};
