import { useMyUserPreferencesQuery } from "@common/user/preferences/api/use-my-user-preferences.query";
import { MyAccountsSelector } from "@fts/finances/accounts/my-accounts/components/form/my-accounts.selector";
import { useTranslation } from "@i18n/use-translation";
import { Button, Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { IoSaveOutline } from "react-icons/io5";

type Props = {
	onSuccess?: CallableFunction;
};

export const MyMainAccountManager: FC<Props> = () => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const { data: { preferences } = {}, isLoading: isLoadingPreferences } =
		useMyUserPreferencesQuery();

	// State to hold selected main account
	const [selectedAccount, setSelectedAccount] = useState(
		preferences?.mainAccount ?? null,
	);

	// Load initial value from preferences
	useEffect(() => {
		setSelectedAccount(preferences?.mainAccount ?? null);
	}, [preferences?.mainAccount]);

	return (
		<Flex direction="column" gap="md">
			<Text>{t().account["main-account"].Description}</Text>
			<MyAccountsSelector
				disabled={isLoadingPreferences}
				value={selectedAccount}
				onChange={setSelectedAccount}
			/>
			<Button disabled={isLoadingPreferences} leftSection={<IoSaveOutline />}>
				{commonT().expressions.Save}
			</Button>
		</Flex>
	);
};
