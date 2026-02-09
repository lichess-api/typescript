import * as z from "zod/mini";

const TimelineEntryStreamStart = z.object({
  type: z.literal(["stream-start"]),
  date: z.number(),
  data: z.object({
    id: z.string(),
    title: z.optional(z.string()),
  }),
});

type TimelineEntryStreamStart = z.infer<typeof TimelineEntryStreamStart>;

export { TimelineEntryStreamStart };
