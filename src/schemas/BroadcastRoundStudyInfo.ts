import * as z from "zod/mini";

const BroadcastRoundStudyInfo = z.object({
  writeable: z.optional(z.boolean()),
  features: z.optional(
    z.object({
      chat: z.optional(z.boolean()),
      computer: z.optional(z.boolean()),
      explorer: z.optional(z.boolean()),
    }),
  ),
});

type BroadcastRoundStudyInfo = z.infer<typeof BroadcastRoundStudyInfo>;

export { BroadcastRoundStudyInfo };
