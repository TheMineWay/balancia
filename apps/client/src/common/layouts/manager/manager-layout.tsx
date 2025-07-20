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

type Actions = MainProps;

const Actions: FC<Actions> = ({ children, style, className }) => {
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

export const ManagerLayout = {
  Main,
  View,
  Actions,
};
