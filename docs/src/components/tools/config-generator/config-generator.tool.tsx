import { generateEnvFile } from "@site/src/components/tools/config-generator/generate-env-file.util";
import { BACKEND_CONFIG } from "@site/src/constants/config/backend-config";
import { Section } from "@site/src/constants/config/env-config.type";
import { FRONTEND_CONFIG } from "@site/src/constants/config/frontend-config";
import clsx from "clsx";
import type React from "react";
import { useMemo, useState } from "react";
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

export type EnvConfig = Record<string, string | number | boolean | string[]>;

type ToolProps = {
	schema: Section[];
};

const Tool: React.FC<ToolProps> = ({ schema }) => {
	const [config, setConfig] = useState<EnvConfig>(
		generateDefaultConfig(schema),
	);

	const envContent = useMemo(
		() => generateEnvFile(schema, config),
		[schema, config],
	);

	return (
		<>
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
			<div className="card">
				<div className={clsx("card__body", styles["env-output"])}>
					{envContent.map((line, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: there is no more info, and it is always displayed the same way
						<p key={index} className={styles["env-line"]}>
							{line}
						</p>
					))}
				</div>
			</div>
		</>
	);
};

const SectionRender: React.FC<{
	section: Section;
	config: EnvConfig;
	setConfig: React.Dispatch<React.SetStateAction<EnvConfig>>;
}> = ({ section, config, setConfig }) => {
	const items = Object.entries(section.items);

	return (
		<div>
			<h3>{section.name}</h3>
			<div className={styles.list}>
				{items.map(([key, item]) => (
					<div key={key}>
						<div className={styles["item-header"]}>
							<label htmlFor={key}>
								{item.name}
								{item.required ? (
									<span className={styles.required}> *</span>
								) : (
									""
								)}
							</label>
							<small>{item.description}</small>
						</div>
						<div className={styles["item-input"]}>
							<Item
								item={item}
								itemKey={key}
								config={config}
								setConfig={setConfig}
							/>
							<button
								onClick={() =>
									setConfig((prev) => ({ ...prev, [key]: item.default ?? "" }))
								}
								type="button"
								className="button button--primary"
								disabled={
									config[key] === item.default || item.default === undefined
								}
							>
								Reset
							</button>
						</div>
						<hr />
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
	config: EnvConfig;
	setConfig: React.Dispatch<React.SetStateAction<EnvConfig>>;
};
const Item: React.FC<ItemProps> = ({ item, itemKey, config, setConfig }) => {
	const common = {
		placeholder: item.default ? `Default: ${item.default}` : undefined,
		id: itemKey,
		className: clsx({
			[styles.pending]: !config[itemKey] && item.required,
		}),
	};

	switch (item.type) {
		case "free":
			return (
				<TextItem
					{...common}
					value={config[itemKey] as string}
					onChange={(newValue) =>
						setConfig((prev) => ({ ...prev, [itemKey]: newValue }))
					}
				/>
			);
		case "number":
			return (
				<NumberItem
					{...common}
					value={config[itemKey] as number}
					onChange={(newValue) =>
						setConfig((prev) => ({ ...prev, [itemKey]: newValue }))
					}
				/>
			);
		case "boolean":
			return (
				<BooleanItem
					{...common}
					value={
						itemKey in config
							? (config[itemKey] as boolean)
							: (item.default ?? false)
					}
					onChange={(newValue) =>
						setConfig((prev) => ({ ...prev, [itemKey]: newValue }))
					}
				/>
			);
		case "enum":
			return (
				<SelectItem
					{...common}
					value={config[itemKey] as string}
					options={item.options}
					onChange={(newValue) =>
						setConfig((prev) => ({ ...prev, [itemKey]: newValue }))
					}
				/>
			);
		case "string_list":
			return (
				<StringListItem
					{...common}
					value={config[itemKey] as string[]}
					onChange={(newValue) =>
						setConfig((prev) => ({ ...prev, [itemKey]: newValue }))
					}
				/>
			);
	}

	/* Unhandled */
	return <p>Cannot render item {itemKey}.</p>;
};

type CommonItemProps<T> = {
	value: T;
	onChange: (newValue: T) => void;
	id: string;
	placeholder?: string;
	className?: string;
};

type TextItemProps = CommonItemProps<string>;
const TextItem: React.FC<TextItemProps> = ({ value, onChange, ...props }) => {
	return (
		<input
			type="text"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			{...props}
		/>
	);
};

type NumberItemProps = CommonItemProps<number>;
const NumberItem: React.FC<NumberItemProps> = ({
	value,
	onChange,
	...props
}) => {
	return (
		<input
			type="number"
			value={value}
			onChange={(e) => onChange(Number(e.target.value))}
			{...props}
		/>
	);
};

type BooleanItemProps = CommonItemProps<boolean>;
const BooleanItem: React.FC<BooleanItemProps> = ({
	value,
	onChange,
	...props
}) => {
	return (
		<input
			type="checkbox"
			checked={value}
			onChange={(e) => onChange(e.target.checked)}
			{...props}
		/>
	);
};

type SelectItemProps = {
	options: string[];
} & CommonItemProps<string>;
const SelectItem: React.FC<SelectItemProps> = ({
	value,
	onChange,
	options,
	...props
}) => {
	return (
		<select value={value} onChange={(e) => onChange(e.target.value)} {...props}>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
};

type StringListItemProps = CommonItemProps<string[]>;
const StringListItem: React.FC<StringListItemProps> = ({
	value = [],
	onChange,
	placeholder: _,
	...props
}) => {
	return (
		<div className={styles["input-list"]}>
			<button
				className="button button--primary"
				type="button"
				onClick={() => {
					const newList = [...value, ""];
					onChange(newList);
				}}
			>
				Add Item
			</button>
			{value.map((val, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: It is the only way to identify the item here
				<div key={index} className={styles["input-list-item"]}>
					<input
						type="text"
						value={val}
						onChange={(e) => {
							const newList = [...value];
							newList[index] = e.target.value;
							onChange(newList);
						}}
						{...props}
					/>
					<button
						className="button button--danger"
						type="button"
						onClick={() => {
							const newList = value.filter((_, i) => i !== index);
							onChange(newList);
						}}
					>
						Remove
					</button>
				</div>
			))}
		</div>
	);
};

// #endregion

// #region Helper functions

const generateDefaultConfig = (schema: Section[]): EnvConfig => {
	const config: EnvConfig = {};

	for (const section of schema) {
		const items = Object.entries(section.items);
		for (const [key, item] of items) {
			config[key] = item.default;
		}
	}

	return config;
};

// #endregion
