import {
	AutoAssignCriteriaModel,
	AutoAssignTriggerFieldModel,
	AutoAssignTriggerMatchOption,
	AutoAssignTriggerType,
} from "@shared/models";

type CompatibleObject = Record<
	string,
	string | number | boolean | null | undefined | Date
>;

/**
 * Given an item, it decides if it matches the criteria defined in the trigger definition.
 */
export const autoAssignMatch = <T extends CompatibleObject>(
	item: T,
	criteria: AutoAssignCriteriaModel,
): boolean => {
	switch (criteria.type) {
		case AutoAssignTriggerType.FIELD:
			return fieldBasedMatch(item, criteria);
		default:
			return false;
	}
};

// #region Modes

const fieldBasedMatch = (
	item: CompatibleObject,
	criteria: AutoAssignTriggerFieldModel,
): boolean => {
	// No field to match
	if (!(criteria.field in item)) return false;

	// Pick the value to match
	const fieldValue = item[criteria.field];

	// Only match string possible values
	if (!["string", "number"].includes(typeof fieldValue)) return false;

	const matcher =
		criteria.matchMode === AutoAssignTriggerMatchOption.EQUALS
			? equalsMatcher
			: containsMatcher;
	return matcher(String(fieldValue), criteria.value);
};

// #endregion

// #region Matchers

const equalsMatcher = (fieldValue: string, criteriaValue: string): boolean => {
	return fieldValue.toLowerCase() === criteriaValue.toLowerCase();
};

const containsMatcher = (
	fieldValue: string,
	criteriaValue: string,
): boolean => {
	return fieldValue.toLowerCase().includes(criteriaValue.toLowerCase());
};

// #endregion
