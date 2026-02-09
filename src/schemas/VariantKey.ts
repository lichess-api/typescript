import * as z from "zod/mini";

const VariantKey = z.literal([
  "standard",
  "chess960",
  "crazyhouse",
  "antichess",
  "atomic",
  "horde",
  "kingOfTheHill",
  "racingKings",
  "threeCheck",
  "fromPosition",
]);

type VariantKey = z.infer<typeof VariantKey>;

export { VariantKey };
