import * as z from "zod/mini";

import { Flair } from "./Flair";
import { Patron } from "./Patron";
import { PatronColor } from "./PatronColor";
import { Title } from "./Title";

const LightUser = z.object({
  id: z.string(),
  name: z.string(),
  flair: z.optional(Flair),
  title: z.optional(Title),
  patron: z.optional(Patron),
  patronColor: z.optional(PatronColor),
});

type LightUser = z.infer<typeof LightUser>;

export { LightUser };
