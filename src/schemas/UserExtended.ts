import * as z from "zod/mini";

import { Count } from "./Count";
import { User } from "./User";
import { UserStreamer } from "./UserStreamer";

const UserExtended = z.intersection(
  User,
  z.object({
    url: z.url(),
    playing: z.optional(z.url()),
    count: z.optional(Count),
    streaming: z.optional(z.boolean()),
    streamer: z.optional(UserStreamer),
    followable: z.optional(z.boolean()),
    following: z.optional(z.boolean()),
    blocking: z.optional(z.boolean()),
    fideId: z.optional(z.number()),
  }),
);

type UserExtended = z.infer<typeof UserExtended>;

export { UserExtended };
