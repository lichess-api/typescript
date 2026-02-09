import * as z from "zod/mini";

import { Flair } from "./Flair";
import { Patron } from "./Patron";
import { PatronColor } from "./PatronColor";
import { Title } from "./Title";

const ChallengeUser = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.optional(z.int()),
  title: z.optional(Title),
  flair: z.optional(Flair),
  patron: z.optional(Patron),
  patronColor: z.optional(PatronColor),
  provisional: z.optional(z.boolean()),
  online: z.optional(z.boolean()),
  lag: z.optional(z.int()),
});

type ChallengeUser = z.infer<typeof ChallengeUser>;

export { ChallengeUser };
