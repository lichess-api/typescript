import * as z from "zod/mini";

const UserStreamer = z.object({
  twitch: z.optional(z.object({ channel: z.optional(z.url()) })),
  youtube: z.optional(z.object({ channel: z.optional(z.url()) })),
});

type UserStreamer = z.infer<typeof UserStreamer>;

export { UserStreamer };
