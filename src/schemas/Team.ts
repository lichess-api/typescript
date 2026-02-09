import * as z from "zod/mini";

import { Flair } from "./Flair";
import { LightUser } from "./LightUser";

const Team = z.object({
  id: z.string(),
  name: z.string(),
  description: z.optional(z.string()),
  flair: z.optional(Flair),
  leader: z.optional(LightUser),
  leaders: z.optional(z.array(LightUser)),
  nbMembers: z.optional(z.int()),
  open: z.optional(z.boolean()),
  joined: z.optional(z.boolean()),
  requested: z.optional(z.boolean()),
});

type Team = z.infer<typeof Team>;

export { Team };
