import {
	BUDGET_SEGMENT_TRANSACTION_DETAILS_FORM_VALUES_SCHEMA,
	BudgetSegmentTransactionDetailsForm,
	type BudgetSegmentTransactionDetailsFormValues,
} from "@fts/finances/budgets/budget-segment-transactions/components/form/budget-segment-transaction-details.form";
import { useMyBudgetSegmentImputationCreateMutation } from "@fts/finances/budgets/my-budget-segment-transactions/api/use-my-budget-segment-imputation-create.mutation";
import { useMyTransactionImputationStatusBySegmentId } from "@fts/finances/budgets/my-budget-segment-transactions/api/use-my-transaction-imputation-status-by-budget-id.query";
import { MyBudgetSegmentCard } from "@fts/finances/budgets/my-budget-segments/components/card/my-budget-segment-card";
import { MyAllBudgetSegmentSelector } from "@fts/finances/budgets/my-budget-segments/components/form/my-all-budget-segment.selector";
import { MyTransactionsSelector } from "@fts/finances/transactions/my-transactions/components/form/my-transactions.selector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	Alert,
	Button,
	Divider,
	Flex,
	InputWrapper,
	Stepper,
} from "@mantine/core";
import type {
	BudgetSegmentImputationModel,
	BudgetSegmentModel,
	TransactionModel,
} from "@shared/models";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { TbAlertCircle } from "react-icons/tb";

type Essentials = {
	transaction: TransactionModel;
	segment: BudgetSegmentModel;
};

type Props = {
	forcedSegment?: BudgetSegmentModel;
	onSuccess?: (imputation: BudgetSegmentImputationModel) => void;
};

export const MyBudgetSegmentTransactionImputeAssistant: FC<Props> = ({
	forcedSegment,
	onSuccess,
}) => {
	const { t } = useTranslation("budget");

	// State of transaction and selection status
	const [essentials, setEssentials] = useState<Essentials | null>(null);

	// Determine active step
	const activeStep = useMemo(() => {
		if (!essentials) {
			return 0;
		}
		return 1;
	}, [essentials]);

	const clearTransaction = useCallback(() => {
		setEssentials(null);
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
					step={0}
				>
					<SelectEssentialsStep
						onSelect={(transaction, segment) =>
							setEssentials({ transaction, segment })
						}
						forcedSegment={forcedSegment}
					/>
				</Stepper.Step>
				<Stepper.Step
					label={
						t()["budget-segment-imputation"].managers["impute-assistant"].steps[
							"set-metadata"
						].Title
					}
					step={1}
				>
					{essentials && (
						<DefineDetailsStep
							transaction={essentials.transaction}
							segment={essentials.segment}
							onNext={onSuccess}
						/>
					)}
				</Stepper.Step>
			</Stepper>
		</Flex>
	);
};

/* Steps */

type SelectEssentialsStepProps = {
	onSelect: (
		transaction: TransactionModel,
		segment: BudgetSegmentModel,
	) => void;

	// Optional
	forcedSegment?: BudgetSegmentModel;
};

const SelectEssentialsStep: FC<SelectEssentialsStepProps> = ({
	onSelect,
	forcedSegment,
}) => {
	const { t } = useTranslation("budget");
	const { t: commonT } = useTranslation("common");

	const [selectedSegment, setSelectedSegment] =
		useState<BudgetSegmentModel | null>(forcedSegment ?? null);

	const [selectedTransaction, setSelectedTransaction] =
		useState<TransactionModel | null>(null);

	const onContinueClick = useCallback(() => {
		if (selectedSegment && selectedTransaction) {
			onSelect(selectedTransaction, selectedSegment);
		}
	}, [onSelect, selectedSegment, selectedTransaction]);

	return (
		<Flex direction="column" gap="xs">
			<InputWrapper label={t().expressions["Budget-segment"]}>
				<MyAllBudgetSegmentSelector
					disabled={Boolean(forcedSegment)}
					budgetId={forcedSegment?.budgetId}
					value={selectedSegment?.id || null}
					onChange={setSelectedSegment}
				/>
			</InputWrapper>

			<Divider className="my-2" />

			<InputWrapper
				label={t().models["budget-segment-imputation"]["transaction-id"].Label}
			>
				<MyTransactionsSelector
					value={selectedTransaction?.id}
					onChange={setSelectedTransaction}
				/>
			</InputWrapper>

			<Divider className="my-2" />

			<Button
				disabled={!selectedSegment || !selectedTransaction}
				onClick={onContinueClick}
			>
				{commonT().expressions.Continue}
			</Button>
		</Flex>
	);
};

type DefineDetailsStepProps = {
	transaction: TransactionModel;
	segment: BudgetSegmentModel;
	onNext?: (created: BudgetSegmentImputationModel) => void;
};

const DefineDetailsStep: FC<DefineDetailsStepProps> = ({
	segment,
	transaction,
	onNext,
}) => {
	const { t } = useTranslation("budget");

	const { mutate: imputate, isPending: isImputating } =
		useMyBudgetSegmentImputationCreateMutation();
	const { data: imputationStatus, isLoading: isLoadingImputationStatus } =
		useMyTransactionImputationStatusBySegmentId({
			segmentId: segment.id,
			transactionId: transaction.id,
		});

	const form = useForm({
		resolver: zodResolver(
			BUDGET_SEGMENT_TRANSACTION_DETAILS_FORM_VALUES_SCHEMA.required(),
		),
	});

	const onSuccess = useCallback(
		(details: BudgetSegmentTransactionDetailsFormValues) => {
			imputate(
				{
					...details,
					segmentId: segment.id,
					transactionId: transaction.id,
				},
				{
					onSuccess: (created) => {
						onNext?.(created);
					},
				},
			);
		},
		[onNext, segment, transaction, imputate],
	);

	return (
		<Flex direction="column">
			<MyBudgetSegmentCard segment={segment} />
			<Divider className="my-4" />

			{/* Alerts */}
			{imputationStatus?.alreadyImputed && (
				<Alert color="red" mb="md" icon={<TbAlertCircle />}>
					{
						t()["budget-segment-imputation"].managers["impute-assistant"]
							.status["already-imputed"].Message
					}
				</Alert>
			)}

			<BudgetSegmentTransactionDetailsForm
				form={form}
				submitText={
					t()["budget-segment-imputation"].managers["impute-assistant"].actions
						.Imputate
				}
				onSuccess={onSuccess}
				loading={isLoadingImputationStatus || isImputating}
				maxPercent={imputationStatus?.availableTransactionPercent}
				disableSubmit={imputationStatus?.alreadyImputed ?? true}
			/>
		</Flex>
	);
};
