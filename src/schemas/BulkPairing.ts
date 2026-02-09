import * as z from "zod/mini";

import { Clock } from "./Clock";
import { VariantKey } from "./VariantKey";

const BulkPairing = z.object({
  id: z.string(),
  games: z.array(
    z.object({
      id: z.optional(z.string()),
      black: z.optional(z.string()),
      white: z.optional(z.string()),
    }),
  ),
  variant: VariantKey,
  clock: Clock,
  pairAt: z.int(),
  pairedAt: z.nullable(z.int()),
  rated: z.boolean(),
  startClocksAt: z.int(),
  scheduledAt: z.int(),
});

type BulkPairing = z.infer<typeof BulkPairing>;

export { BulkPairing };
