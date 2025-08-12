import { Switch } from "@mantine/core";
import { useLocalConfig } from "@providers/config/local-config.context";
import { useCallback } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitch: FC = () => {
    const { setConfig, config } = useLocalConfig();

    const theme = config.theme;

    const onThemeChange = useCallback((newTheme: 'light' | 'dark') => {
        setConfig({
            ...config,
            theme: {
                ...theme,
                colorScheme: newTheme
            }
        })
    }, [config, theme, setConfig]);

    return <Switch offLabel={<BiSun size={14}/>} onLabel={<BiMoon size={14}/>} checked={theme.colorScheme === 'dark'} onChange={(e) => onThemeChange(e.target.checked ? 'dark' : 'light')} />;
}
