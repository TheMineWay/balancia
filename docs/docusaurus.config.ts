import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import * as pkg from "./package.json";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
	title: "NestFlux",
	tagline: "ReactJS + NestJS made easy",
	favicon: "img/favicon.ico",

	// Set the production url of your site here
	url: pkg.homepage,
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/NestFlux/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	projectName: "NestFlux", // Usually your repo name.
	organizationName: "TheMineWay", // Usually your GitHub org/user name.
	trailingSlash: false,

	onBrokenLinks: "throw",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},
	themes: ["@docusaurus/theme-mermaid"],

	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					editUrl: pkg.repository.url + "/tree/main/docs",
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
				sitemap: {
					lastmod: "date",
					changefreq: "weekly",
					priority: 0.5,
					ignorePatterns: ["/tags/**"],
					filename: "sitemap.xml",
					createSitemapItems: async (params) => {
						const { defaultCreateSitemapItems, ...rest } = params;
						const items = await defaultCreateSitemapItems(rest);
						return items.filter((item) => !item.url.includes("/page/"));
					},
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		metadata: [
			{ name: "keywords", content: "nestJS, reactJS, monorepo" },
			{ name: "twitter:card", content: "summary_large_image" },
		],

		// Replace with your project's social card
		image: "img/social-card.png",
		navbar: {
			title: "NestFlux",
			logo: {
				alt: "NestFlux logo",
				src: "img/logo.png",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "projectSidebar",
					position: "left",
					label: "📃 Project documentation",
				},
				{
					type: "docSidebar",
					sidebarId: "nestfluxSidebar",
					position: "left",
					label: "🩵 NestFlux documentation",
				},
				{
					href: pkg.repository.url,
					label: "GitHub",
					position: "right",
				},
			],
		},
		footer: {
			style: "dark",
			links: [
				{
					title: "More",
					items: [
						{
							label: "GitHub",
							href: pkg.repository.url,
						},
					],
				},
			],
			copyright: `MIT Licensed ${new Date().getFullYear()} NestFlux. Built with Docusaurus and love.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
	markdown: {
		mermaid: true,
		hooks: {
			onBrokenMarkdownLinks: "warn",
		},
	},
};

export default config;
