import * as z from "minizod";

const GameChat = z.array(
  z.object({
    text: z.string(),
    user: z.string(),
  }),
);

type GameChat = z.infer<typeof GameChat>;

export { GameChat };
