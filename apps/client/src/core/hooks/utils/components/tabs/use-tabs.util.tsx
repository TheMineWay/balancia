import { Route } from "@routes/__root";
import { useNavigate } from "@tanstack/react-router";
import type { TabsProps } from "antd";
import { useEffect, useState } from "react";

type TrackOptions = {
  by: "query";
  name: string;
};

export type UseTabsOptions = {
  defaultTab?: string;
  items?: TabsProps["items"];
  track?: TrackOptions;
};

export const useTabs = ({ defaultTab, items, track }: UseTabsOptions = {}) => {
  const navigate = useNavigate({ from: Route.fullPath });
  const tracked = getUrlTracked(track);
  const [active, setActive] = useState<string | null>(
    tracked ?? // Tracked URL
      defaultTab ?? // Defined default tab
      items?.find((i) => i.active)?.key ?? // Defined active key on "items"
      items?.[0].key ?? // First item
      null
  );

  const control = {
    items,
    defaultValue: defaultTab,
    activeKey: active ?? undefined,
    onChange: setActive,
  } satisfies TabsProps;

  useEffect(() => {
    if (!track) return;

    navigate({ search: (prev) => ({ ...prev, [track.name]: active }) });
  }, [track, active, navigate]);

  return {
    control,
    active,
    setActive,
  };
};

export type UseTabs = ReturnType<typeof useTabs>;

/* Internal utils */

const getUrlTracked = (trackOptions?: TrackOptions) => {
  if (!trackOptions) return null;

  const url = new URLSearchParams(window.location.search);
  return url.get(trackOptions.name);
};
