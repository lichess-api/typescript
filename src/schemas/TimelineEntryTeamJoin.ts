import * as z from "zod/mini";

const TimelineEntryTeamJoin = z.object({
  type: z.literal(["team-join"]),
  date: z.number(),
  data: z.object({
    userId: z.string(),
    teamId: z.string(),
  }),
});

type TimelineEntryTeamJoin = z.infer<typeof TimelineEntryTeamJoin>;

export { TimelineEntryTeamJoin };
