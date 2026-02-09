import * as z from "zod/mini";

const OpponentGoneEvent = z.object({
  type: z.literal("opponentGone"),
  gone: z.boolean(),
  claimWinInSeconds: z.optional(z.int()),
});

type OpponentGoneEvent = z.infer<typeof OpponentGoneEvent>;

export { OpponentGoneEvent };
