import * as z from "zod";

import { Flair } from "./Flair";
import { Patron } from "./Patron";
import { PatronColor } from "./PatronColor";
import { Title } from "./Title";

const ChallengeUser = z.object({
  id: z.string(),
  name: z.string(),
  rating: z.int().optional(),
  title: Title.optional(),
  flair: Flair.optional(),
  patron: Patron.optional(),
  patronColor: PatronColor.optional(),
  provisional: z.boolean().optional(),
  online: z.boolean().optional(),
  lag: z.int().optional(),
});

type ChallengeUser = z.infer<typeof ChallengeUser>;

export { ChallengeUser };
