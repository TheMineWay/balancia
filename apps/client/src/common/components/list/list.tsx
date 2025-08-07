import type { WithChildren } from "@common/types/component/component.types";
import clsx from "clsx";
import styles from "./list.module.pcss";
type Common = {
  className?: string;
};

type ListLayoutProps = WithChildren &
  Common & {
    fullHeight?: boolean;
  };

/**
 * Root component for List.
 */
const Layout: FC<ListLayoutProps> = ({
  children,
  className,
  fullHeight = true,
}) => {
  return (
    <div
      className={clsx("flex flex-col gap-2", className, {
        [styles["full-height"]]: fullHeight,
      })}
    >
      {children}
    </div>
  );
};

type ListHeaderProps = WithChildren & Common;

/**
 * Header component for List.
 * Used to display the title or any header content.
 */
const Header: FC<ListHeaderProps> = ({ children, className }) => {
  return <div className={clsx("font-bold text-lg", className)}>{children}</div>;
};

type ListFooterProps = WithChildren & Common;

const Footer: FC<ListFooterProps> = ({ children, className }) => {
  return <div className={clsx(className)}>{children}</div>;
};

type ListVerticalContentProps = WithChildren & Common;

/**
 * Vertical content component for List.
 * Used to display content in a vertical layout.
 * This is useful for lists that require a vertical arrangement of items.
 */
const VerticalContent: FC<ListVerticalContentProps> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx("flex flex-col gap-1", className, styles.content)}>
      {children}
    </div>
  );
};

const List = {
  Layout,
  Header,
  Footer,
  VerticalContent,
};

export default List;
