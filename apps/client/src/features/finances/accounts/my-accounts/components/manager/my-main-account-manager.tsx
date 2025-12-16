import { useMyUserPreferencesQuery } from "@common/user/preferences/api/use-my-user-preferences.query";
import { useMyMainAccountSetMutation } from "@fts/finances/accounts/my-accounts/api/use-my-main-account-set.mutation";
import { MyAccountsSelector } from "@fts/finances/accounts/my-accounts/components/form/my-accounts.selector";
import { useTranslation } from "@i18n/use-translation";
import { Button, Flex, Text } from "@mantine/core";
import type { AccountModel } from "@shared/models";
import { useCallback, useEffect, useState } from "react";
import { IoSaveOutline } from "react-icons/io5";

type Props = {
	onSuccess?: (newMainAccountId: AccountModel["id"] | null) => void;
};

export const MyMainAccountManager: FC<Props> = ({ onSuccess }) => {
	const { t } = useTranslation("finances");
	const { t: commonT } = useTranslation("common");

	const { data: { preferences } = {}, isLoading: isLoadingPreferences } =
		useMyUserPreferencesQuery();
	const { mutate: setMainAccount, isPending: isUpdatingMainAccount } =
		useMyMainAccountSetMutation();

	// State to hold selected main account
	const [selectedAccount, setSelectedAccount] = useState(
		preferences?.mainAccount ?? null,
	);

	// Load initial value from preferences
	useEffect(() => {
		setSelectedAccount(preferences?.mainAccount ?? null);
	}, [preferences?.mainAccount]);

	const onChangeMainAccountClick = useCallback(() => {
		setMainAccount(selectedAccount, {
			onSuccess: () => {
				onSuccess?.(selectedAccount);
			},
		});
	}, [setMainAccount, selectedAccount, onSuccess]);

	return (
		<Flex direction="column" gap="md">
			<Text>{t().account["main-account"].Description}</Text>
			<MyAccountsSelector
				disabled={isLoadingPreferences}
				value={selectedAccount}
				onChange={setSelectedAccount}
			/>
			<Button
				onClick={onChangeMainAccountClick}
				disabled={
					isLoadingPreferences || preferences?.mainAccount === selectedAccount
				}
				leftSection={<IoSaveOutline />}
				loading={isUpdatingMainAccount}
			>
				{commonT().expressions.Save}
			</Button>
		</Flex>
	);
};
