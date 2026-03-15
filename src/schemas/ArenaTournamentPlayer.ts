import * as z from "minizod";

const ArenaTournamentPlayer = z.object({
  games: z.int(),
  score: z.int(),
  rank: z.int(),
  performance: z.optional(z.int()),
});

type ArenaTournamentPlayer = z.infer<typeof ArenaTournamentPlayer>;

export { ArenaTournamentPlayer };
