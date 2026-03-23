import * as z from "minizod";

const PlayerGameChat = z.array(
  z.object({
    text: z.string(),
    user: z.string(),
  }),
);

type PlayerGameChat = z.infer<typeof PlayerGameChat>;

export { PlayerGameChat };
