import { Button, ButtonProps } from "antd";
import clsx from "clsx";
import { ReactNode, useState } from "react";

export type ButtonTabItemType<K extends string> = {
  label: string;
  icon?: ReactNode;
  component: ReactNode;
  key: K;
  onClick?: CallableFunction;
};

type ButtonTabsProps<K extends string> = {
  className?: string;
  items: Array<ButtonTabItemType<K>>;
  initialKey?: K;
  buttonProps?: Omit<ButtonProps, "icon" | "onClick" | "type">;
};

export function ButtonTabs<K extends string>({
  initialKey,
  items,
  buttonProps,
  className,
}: Readonly<ButtonTabsProps<K>>) {
  const [currentKey, setCurrentKey] = useState<K>(
    initialKey ?? items[0]?.key ?? null
  );

  return (
    <div className={clsx(className)}>
      <div className="flex gap-1">
        {items.map((item) => (
          <Button
            key={item.key}
            {...buttonProps}
            type={currentKey === item.key ? "primary" : "default"}
            onClick={() => {
              item.onClick?.();
              setCurrentKey(item.key);
            }}
            icon={item.icon}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div>{items.find((item) => item.key === currentKey)?.component}</div>
    </div>
  );
}
