import * as z from "zod/mini";

const GameChat = z.array(
  z.object({
    text: z.string(),
    user: z.string(),
  }),
);

type GameChat = z.infer<typeof GameChat>;

export { GameChat };
