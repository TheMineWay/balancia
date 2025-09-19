import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { MainNavWidget } from "@site/src/components/nav/home/main-nav-widget";
import Layout from "@theme/Layout";
import type { FC } from "react";
import styles from "./index.module.css";

const Home: FC = () => {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description={`Documentation page for ${siteConfig.title}`}
			wrapperClassName={styles.layout}
		>
			<div className={styles.title}>
				<h1>
					<span>{siteConfig.title}</span> Documentation
				</h1>
			</div>

			<div className="margin-top--lg">
				<MainNavWidget />
			</div>
		</Layout>
	);
};

export default Home;
