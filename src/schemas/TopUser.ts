import * as z from "zod/mini";

import { Patron } from "./Patron";
import { PatronColor } from "./PatronColor";
import { Title } from "./Title";

const TopUser = z.object({
  id: z.string(),
  username: z.string(),
  perfs: z.optional(
    z.record(
      z.string(),
      z.object({
        rating: z.int(),
        progress: z.int(),
      }),
    ),
  ),
  title: z.optional(Title),
  patron: z.optional(Patron),
  patronColor: z.optional(PatronColor),
  online: z.optional(z.boolean()),
});

type TopUser = z.infer<typeof TopUser>;

export { TopUser };
