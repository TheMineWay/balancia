import { Flex } from "@mantine/core";

type MainProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Main: FC<MainProps> = ({ children, style, className }) => {
  return (
    <Flex style={style} className={className} gap="md" direction="column">
      {children}
    </Flex>
  );
};

type ViewProps = MainProps;

const View: FC<ViewProps> = ({ children, style, className }) => {
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};

type ActionsProps = MainProps;

const Actions: FC<ActionsProps> = ({ children, style, className }) => {
  return (
    <Flex
      style={style}
      className={className}
      gap="md"
      direction="row"
      justify="end"
    >
      {children}
    </Flex>
  );
};

const ManagerLayout = {
  Main,
  View,
  Actions,
};

export default ManagerLayout;
