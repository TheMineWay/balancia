import { useTranslation } from "@i18n/use-translation";
import {
	ActionIcon,
	type ActionIconProps,
	Affix,
	Drawer,
	LoadingOverlay,
	Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { lazy, Suspense, useState } from "react";
import { BiMoney } from "react-icons/bi";
import { BsDpad } from "react-icons/bs";

// Lazy imports
const MyTransactionCreateManager = lazy(() =>
	import(
		"@fts/finances/transactions/my-transactions/components/manager/my-transaction-create-manager"
	).then((module) => ({ default: module.MyTransactionCreateManager })),
);

export const GlobalFastActions: FC = () => {
	const { t: commonT } = useTranslation("common");
	const { t: financesT } = useTranslation("finances");
	const [
		registerTransactionOpened,
		{ open: openRegisterTransaction, close: closeRegisterTransaction },
	] = useDisclosure();

	const [actionsVisible, setActionsVisible] = useState(false);

	return (
		<>
			<Affix
				position={{ bottom: "xl", right: "xl" }}
				className="flex flex-col gap-4"
			>
				<Transition
					mounted={actionsVisible}
					transition="fade-up"
					duration={200}
					timingFunction="ease"
				>
					{(styles) => (
						<div style={styles}>
							<Actions
								onInteracted={() => setActionsVisible(false)}
								openRegisterTransaction={openRegisterTransaction}
							/>
						</div>
					)}
				</Transition>
				<ActionIcon
					size="xl"
					radius="xl"
					aria-label={commonT().components["global-fast-actions"].Name}
					onClick={() => setActionsVisible((v) => !v)}
				>
					<BsDpad />
				</ActionIcon>
			</Affix>

			{/* Managers */}
			<Drawer
				position="right"
				title={financesT().transaction.create.Title}
				opened={registerTransactionOpened}
				onClose={closeRegisterTransaction}
			>
				<Suspense fallback={<LoadingOverlay visible />}>
					<MyTransactionCreateManager onSuccess={closeRegisterTransaction} />
				</Suspense>
			</Drawer>
		</>
	);
};

/* Actions */
const COMMON_ACTION_PROPS = {
	size: "xl",
	radius: "xl",
	variant: "filled",
	color: "gray",
} satisfies Partial<ActionIconProps>;

type ActionProps = {
	onInteracted: CallableFunction;

	// Transaction
	openRegisterTransaction: () => void;
};

const Actions: FC<ActionProps> = ({
	onInteracted,
	openRegisterTransaction,
}) => {
	const { t: commonT } = useTranslation("common");

	return (
		<>
			{/* Register translation */}
			<ActionIcon
				{...COMMON_ACTION_PROPS}
				className={"hidden"}
				aria-label={commonT().components["global-fast-actions"].Name}
				onClick={() => {
					openRegisterTransaction();
					onInteracted();
				}}
			>
				<BiMoney />
			</ActionIcon>
		</>
	);
};
