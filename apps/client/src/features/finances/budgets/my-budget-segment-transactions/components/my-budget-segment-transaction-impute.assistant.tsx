import { useTranslation } from "@i18n/use-translation";
import { Flex, Stepper } from "@mantine/core";
import type {
	BudgetSegmentImputationModel,
	BudgetSegmentModel,
	TransactionModel,
} from "@shared/models";
import { useCallback, useMemo, useState } from "react";

type TransactionSelectionState = {
	transaction: TransactionModel | null;
	selected: boolean;
};

type Props = {
	segment: BudgetSegmentModel;
	onSuccess?: (imputation: BudgetSegmentImputationModel) => void;
};

export const MyBudgetSegmentTransactionImputeAssistant: FC<Props> = ({}) => {
	const { t } = useTranslation("budget");

	// State of transaction and selection status
	const [selectedTransaction, setSelectedTransaction] =
		useState<TransactionSelectionState>({ transaction: null, selected: false });

	// Determine active step
	const activeStep = useMemo(() => {
		if (!selectedTransaction.selected || !selectedTransaction.transaction) {
			return 1;
		}
		return 2;
	}, [selectedTransaction]);

	const clearTransaction = useCallback(() => {
		setSelectedTransaction({ transaction: null, selected: false });
	}, []);

	const onStepClick = useCallback(
		(step: number) => {
			if (step === activeStep) return;

			if (step === 0) clearTransaction();
		},
		[clearTransaction, activeStep],
	);

	return (
		<Flex direction="column">
			<Stepper active={activeStep} onStepClick={onStepClick}>
				<Stepper.Step
					label={
						t()["budget-segment-imputation"].managers["impute-assistant"].steps[
							"select-essentials"
						].Title
					}
				>
					<SelectTransactionStep
						transactionSelectionState={selectedTransaction}
						setTransactionSelectionState={setSelectedTransaction}
					/>
				</Stepper.Step>
				<Stepper.Step
					label={
						t()["budget-segment-imputation"].managers["impute-assistant"].steps[
							"set-metadata"
						].Title
					}
				></Stepper.Step>
			</Stepper>
		</Flex>
	);
};

/* Steps */

type SelectTransactionStepProps = {
	transactionSelectionState: TransactionSelectionState;
	setTransactionSelectionState: React.Dispatch<
		React.SetStateAction<TransactionSelectionState>
	>;
};

const SelectTransactionStep: FC<SelectTransactionStepProps> = ({}) => {
	return <></>;
};
