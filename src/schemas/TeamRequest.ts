import * as z from "minizod";

const TeamRequest = z.object({
  teamId: z.string(),
  userId: z.string(),
  date: z.int(),
  message: z.optional(z.string()),
});

type TeamRequest = z.infer<typeof TeamRequest>;

export { TeamRequest };
