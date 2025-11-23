import * as z from "zod";

import { Flair } from "./Flair";
import { Patron } from "./Patron";
import { PatronColor } from "./PatronColor";
import { Title } from "./Title";

const LightUser = z.object({
  id: z.string(),
  name: z.string(),
  flair: Flair.optional(),
  title: Title.optional(),
  patron: Patron.optional(),
  patronColor: PatronColor.optional(),
});

type LightUser = z.infer<typeof LightUser>;

export { LightUser };
export default LightUser;
