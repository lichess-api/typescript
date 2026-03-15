import * as z from "minizod";

const UciVariant = z.literal([
  "chess",
  "crazyhouse",
  "antichess",
  "atomic",
  "horde",
  "kingofthehill",
  "racingkings",
  "3check",
]);

type UciVariant = z.infer<typeof UciVariant>;

export { UciVariant };
