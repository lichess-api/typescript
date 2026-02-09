import * as z from "zod/mini";

import { Flair } from "./Flair";
import { Patron } from "./Patron";
import { PatronColor } from "./PatronColor";
import { Perfs } from "./Perfs";
import { PlayTime } from "./PlayTime";
import { Profile } from "./Profile";
import { Title } from "./Title";

const User = z.object({
  id: z.string(),
  username: z.string(),
  perfs: z.optional(Perfs),
  title: z.optional(Title),
  flair: z.optional(Flair),
  createdAt: z.optional(z.int()),
  disabled: z.optional(z.boolean()),
  tosViolation: z.optional(z.boolean()),
  profile: z.optional(Profile),
  seenAt: z.optional(z.int()),
  playTime: z.optional(PlayTime),
  patron: z.optional(Patron),
  patronColor: z.optional(PatronColor),
  verified: z.optional(z.boolean()),
});

type User = z.infer<typeof User>;

export { User };
