import * as z from "zod/mini";

import { LightUser } from "./LightUser";

const UserNote = z.object({
  from: z.optional(LightUser),
  to: z.optional(LightUser),
  text: z.optional(z.string()),
  date: z.optional(z.int()),
});

type UserNote = z.infer<typeof UserNote>;

export { UserNote };
