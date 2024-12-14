/**
 * Parses a value into a number if it's a valid string representation of a number.
 * If the value is not a valid string or cannot be converted to a number, the fallback is returned.
 *
 * @param {any | undefined} value - The input value to parse. Can be of any type or undefined.
 * @param {number} fallback - The fallback value to return if the input value is invalid.
 * @returns {number} - The parsed number, or the fallback if the input is invalid.
 */
export const parseOptionalNumber = (
  value: any | undefined,
  fallback: number
): number => {
  if (typeof value !== "string") return fallback;
  if (value.trim().length === 0) return fallback;
  const toReturn = +value;
  if (isNaN(toReturn)) return fallback;
  return toReturn;
};
