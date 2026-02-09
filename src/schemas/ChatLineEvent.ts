import * as z from "zod/mini";

const ChatLineEvent = z.object({
  type: z.literal("chatLine"),
  room: z.literal(["player", "spectator"]),
  username: z.string(),
  text: z.string(),
});

type ChatLineEvent = z.infer<typeof ChatLineEvent>;

export { ChatLineEvent };
