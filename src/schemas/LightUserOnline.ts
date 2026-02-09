import * as z from "zod/mini";

import { LightUser } from "./LightUser";

const LightUserOnline = z.intersection(
  LightUser,
  z.object({ online: z.optional(z.boolean()) }),
);

type LightUserOnline = z.infer<typeof LightUserOnline>;

export { LightUserOnline };
