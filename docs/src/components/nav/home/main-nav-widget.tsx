import type { FC } from "react";
import pkg from "../../../../package.json";
import styles from "./main-nav-widget.module.css";

export const MainNavWidget: FC = () => {
	return (
		<div className={styles.root}>
			<a className="button button--secondary" href="/balancia/docs/user-guide">
				📖 User guide
			</a>
			<a
				rel="noopener noreferrer"
				target="_blank"
				className="button button--secondary"
				href={pkg.repository.url}
			>
				⭐ Star on GitHub
			</a>
		</div>
	);
};
