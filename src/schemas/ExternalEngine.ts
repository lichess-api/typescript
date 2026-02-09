import * as z from "zod/mini";

import { UciVariant } from "./UciVariant";

const ExternalEngine = z.object({
  id: z.string(),
  name: z.string().check(z.minLength(3)).check(z.maxLength(200)),
  clientSecret: z.string(),
  userId: z.string(),
  maxThreads: z.int().check(z.minimum(1)).check(z.maximum(65536)),
  maxHash: z.int().check(z.minimum(1)).check(z.maximum(1048576)),
  variants: z.array(UciVariant),
  providerData: z.optional(z.nullable(z.string())),
});

type ExternalEngine = z.infer<typeof ExternalEngine>;

export { ExternalEngine };
