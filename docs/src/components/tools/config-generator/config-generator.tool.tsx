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
		<div className={clsx(styles.tool, styles.list)}>
			<select
				value={project}
				onChange={(e) => setProject(e.target.value as Project)}
			>
				<option value="frontend">💻 Frontend</option>
				<option value="backend">☕ Backend</option>
			</select>

			<div className="card">
				<div className={clsx("card__body", styles.list)}>
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

// #region Tool components

type Config = Record<string, string | number | boolean | string[]>;

type ToolProps = {
	schema: Section[];
};

const Tool: React.FC<ToolProps> = ({ schema }) => {
	const [config, setConfig] = useState<Config>(generateDefaultConfig(schema));

	return (
		<div className={styles.list}>
			{schema.map((section) => (
				<SectionRender
					key={section.name}
					section={section}
					config={config}
					setConfig={setConfig}
				/>
			))}
		</div>
	);
};

const SectionRender: React.FC<{
	section: Section;
	config: Config;
	setConfig: React.Dispatch<React.SetStateAction<Config>>;
}> = ({ section, config, setConfig }) => {
	const items = Object.entries(section.items);

	return (
		<div>
			<h3>{section.name}</h3>
			<div className={styles.list}>
				{items.map(([key, item]) => (
					<div key={key}>
						<div className={styles["item-header"]}>
							<label htmlFor={key}>{item.name}</label>
							<small>{item.description}</small>
						</div>
						<Item
							item={item}
							itemKey={key}
							config={config}
							setConfig={setConfig}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

/* Form items render */

type ItemProps = {
	item: Section["items"][string];
	itemKey: string;
	config: Config;
	setConfig: React.Dispatch<React.SetStateAction<Config>>;
};
const Item: React.FC<ItemProps> = ({ item, itemKey, config, setConfig }) => {
	switch (item.type) {
		case "free":
			return (
				<TextItem
					id={itemKey}
					value={config[itemKey] as string}
					onChange={(newValue) =>
						setConfig((prev) => ({ ...prev, [itemKey]: newValue }))
					}
				/>
			);
		case "number":
			return (
				<NumberItem
					id={itemKey}
					value={config[itemKey] as number}
					onChange={(newValue) =>
						setConfig((prev) => ({ ...prev, [itemKey]: newValue }))
					}
				/>
			);
		case "boolean":
			return (
				<BooleanItem
					id={itemKey}
					value={config[itemKey] as boolean}
					onChange={(newValue) =>
						setConfig((prev) => ({ ...prev, [itemKey]: newValue }))
					}
				/>
			);
		case "enum":
			return (
				<SelectItem
					id={itemKey}
					value={config[itemKey] as string}
					options={item.options}
					onChange={(newValue) =>
						setConfig((prev) => ({ ...prev, [itemKey]: newValue }))
					}
				/>
			);
	}

	/* Unhandled */
	return <p>Cannot render item {itemKey}.</p>;
};

type TextItemProps = {
	value: string;
	onChange: (newValue: string) => void;
	id: string;
};
const TextItem: React.FC<TextItemProps> = ({ value, onChange, id }) => {
	return (
		<input
			type="text"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			id={id}
		/>
	);
};

type NumberItemProps = {
	value: number;
	onChange: (newValue: number) => void;
	id: string;
};
const NumberItem: React.FC<NumberItemProps> = ({ value, onChange, id }) => {
	return (
		<input
			type="number"
			value={value}
			onChange={(e) => onChange(Number(e.target.value))}
			id={id}
		/>
	);
};

type BooleanItemProps = {
	value: boolean;
	onChange: (newValue: boolean) => void;
	id: string;
};
const BooleanItem: React.FC<BooleanItemProps> = ({ value, onChange, id }) => {
	return (
		<input
			type="checkbox"
			checked={value}
			onChange={(e) => onChange(e.target.checked)}
			id={id}
		/>
	);
};

type SelectItemProps = {
	value: string;
	onChange: (newValue: string) => void;
	options: string[];
	id: string;
};
const SelectItem: React.FC<SelectItemProps> = ({
	value,
	onChange,
	options,
	id,
}) => {
	return (
		<select value={value} onChange={(e) => onChange(e.target.value)} id={id}>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

// #endregion

// #region Helper functions

const generateDefaultConfig = (schema: Section[]): Config => {
	const config: Config = {};

	for (const section of schema) {
		const items = Object.entries(section.items);
		for (const [key, item] of items) {
			config[key] = item.default;
		}
	}

	return config;
};

// #endregion
