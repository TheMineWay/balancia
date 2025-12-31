import {
	BUDGET_SEGMENT_TRANSACTION_DETAILS_FORM_VALUES_SCHEMA,
	BudgetSegmentTransactionDetailsForm,
	type BudgetSegmentTransactionDetailsFormValues,
} from "@fts/finances/budgets/budget-segment-transactions/components/form/budget-segment-transaction-details.form";
import { useMyBudgetSegmentImputationCreateMutation } from "@fts/finances/budgets/my-budget-segment-transactions/api/use-my-budget-segment-imputation-create.mutation";
import { MyBudgetSegmentCard } from "@fts/finances/budgets/my-budget-segments/components/card/my-budget-segment-card";
import { MyAllBudgetSegmentSelector } from "@fts/finances/budgets/my-budget-segments/components/form/my-all-budget-segment.selector";
import { useMyBudgetByIdQuery } from "@fts/finances/budgets/my-budgets/api/use-my-budget-by-id.query";
import { MyTransactionsSelector } from "@fts/finances/transactions/my-transactions/components/form/my-transactions.selector";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "@i18n/use-translation";
import {
	Button,
	Divider,
	Flex,
	InputWrapper,
	LoadingOverlay,
	Stepper,
} from "@mantine/core";
import type {
	BudgetSegmentImputationCreateModel,
	BudgetSegmentImputationModel,
	BudgetSegmentModel,
	TransactionModel,
} from "@shared/models";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

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
	const [imputationDetails, setImputationDetails] =
		useState<BudgetSegmentImputationCreateModel | null>(null);

	// Determine active step
	const activeStep = useMemo(() => {
		if (!essentials) {
			return 0;
		}
		if (!imputationDetails) {
			return 1;
		}
		return 2;
	}, [essentials, imputationDetails]);

	const clearTransaction = useCallback(() => {
		setEssentials(null);
	}, []);

	const onStepClick = useCallback(
		(step: number) => {
			if (step === activeStep) return;

			if (step <= 1) setImputationDetails(null);
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
				>
					{essentials && (
						<DefineDetailsStep
							transaction={essentials.transaction}
							segment={essentials.segment}
							onNext={setImputationDetails}
						/>
					)}
				</Stepper.Step>
				<Stepper.Step
					label={
						t()["budget-segment-imputation"].managers["impute-assistant"].steps
							.review.Title
					}
				>
					{essentials && imputationDetails && (
						<ReviewDetailsStep
							imputationInfo={imputationDetails}
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
	onNext?: (imputationInfo: BudgetSegmentImputationCreateModel) => void;
};

const DefineDetailsStep: FC<DefineDetailsStepProps> = ({
	segment,
	transaction,
	onNext,
}) => {
	const { t } = useTranslation("budget");

	const { data: budget } = useMyBudgetByIdQuery(segment.budgetId);
	const form = useForm({
		resolver: zodResolver(
			BUDGET_SEGMENT_TRANSACTION_DETAILS_FORM_VALUES_SCHEMA.required(),
		),
	});

	const onSuccess = useCallback(
		(details: BudgetSegmentTransactionDetailsFormValues) => {
			onNext?.({
				...details,
				segmentId: segment.id,
				transactionId: transaction.id,
			});
		},
		[onNext, segment, transaction],
	);

	if (!budget) return <LoadingOverlay visible={true} />;

	return (
		<Flex direction="column">
			<MyBudgetSegmentCard segment={segment} />
			<Divider className="my-4" />
			<BudgetSegmentTransactionDetailsForm
				form={form}
				submitText={
					t()["budget-segment-imputation"].managers["impute-assistant"].steps[
						"set-metadata"
					].Set
				}
				onSuccess={onSuccess}
			/>
		</Flex>
	);
};

type ReviewDetailsStepProps = {
	transaction: TransactionModel;
	segment: BudgetSegmentModel;
	imputationInfo: BudgetSegmentImputationCreateModel;
	onNext?: (created: BudgetSegmentImputationModel) => void;
};

const ReviewDetailsStep: FC<ReviewDetailsStepProps> = ({
	transaction,
	segment,
	imputationInfo,
	onNext,
}) => {
	const { t } = useTranslation("budget");

	const { mutate: impute, isPending: isImputating } =
		useMyBudgetSegmentImputationCreateMutation();

	const onImputeClick = useCallback(() => {
		impute(imputationInfo, {
			onSuccess: (created) => {
				onNext?.(created);
			},
		});
	}, [impute, imputationInfo, onNext]);

	return (
		<Flex direction="column">
			<Button loading={isImputating} onClick={onImputeClick}>
				{
					t()["budget-segment-imputation"].managers["impute-assistant"].steps
						.review.Impute
				}
			</Button>
		</Flex>
	);
};
