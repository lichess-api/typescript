import * as z from "minizod";

const SpectatorGameChat = z.object({
  lines: z.array(
    z.object({
      text: z.string(),
      user: z.string(),
    }),
  ),
});

type SpectatorGameChat = z.infer<typeof SpectatorGameChat>;

export { SpectatorGameChat };
