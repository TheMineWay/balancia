import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

import { JSX } from "react";

export default function Home(): JSX.Element {
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
    </Layout>
  );
}
