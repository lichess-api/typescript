import * as z from "minizod";

const StatByFideTC = z.object({
  standard: z.optional(z.int()),
  rapid: z.optional(z.int()),
  blitz: z.optional(z.int()),
});

type StatByFideTC = z.infer<typeof StatByFideTC>;

export { StatByFideTC };
