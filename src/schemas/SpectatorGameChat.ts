import * as z from "minizod";

const SpectatorGameChat = z.array(
  z.object({
    text: z.string(),
    user: z.string(),
  }),
);

type SpectatorGameChat = z.infer<typeof SpectatorGameChat>;

export { SpectatorGameChat };
