import * as z from "zod/mini";

const Crosstable = z.object({
  users: z.record(z.string(), z.number()),
  nbGames: z.int(),
});

type Crosstable = z.infer<typeof Crosstable>;

export { Crosstable };
