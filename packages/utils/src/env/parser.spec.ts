import { describe, expect, it } from "vitest";
import { parseOptionalNumber } from "./parser";

describe("should return fallback value", () => {
  it.each([null, undefined, "", false])("when given %s", (val) =>
    expect(parseOptionalNumber(val, 100)).toEqual(100)
  );
});

it("should return parsed values given valid string numbers", () => {
  const unparsed = [
    "1",
    "-1",
    "12",
    "1025",
    "0",
    "-0",
    "-77",
    "0.1",
    "-0.1",
    "-0.0",
    "0.0",
    "1.0",
    "-1.0",
  ];

  const parsed = [1, -1, 12, 1025, 0, -0, -77, 0.1, -0.1, -0, 0, 1, -1];

  expect(unparsed.map((u) => parseOptionalNumber(u, 9999))).toEqual(parsed);
});
