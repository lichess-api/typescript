import * as z from "zod/mini";

const BroadcastRoundFormName = z
  .string()
  .check(z.minLength(3))
  .check(z.maxLength(80));

type BroadcastRoundFormName = z.infer<typeof BroadcastRoundFormName>;

export { BroadcastRoundFormName };
