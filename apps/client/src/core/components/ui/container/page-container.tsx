import clsx from "clsx";
import { ReactNode } from "react";
import styles from "./page-container.module.pcss";

type Props = {
  children?: ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className,
}: Readonly<Props>) {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
