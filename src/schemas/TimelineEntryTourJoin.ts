import * as z from "minizod";

const TimelineEntryTourJoin = z.object({
  type: z.literal(["tour-join"]),
  date: z.number(),
  data: z.object({
    userId: z.string(),
    tourId: z.string(),
    tourName: z.string(),
  }),
});

type TimelineEntryTourJoin = z.infer<typeof TimelineEntryTourJoin>;

export { TimelineEntryTourJoin };
