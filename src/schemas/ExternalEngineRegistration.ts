import * as z from "zod/mini";

import { UciVariant } from "./UciVariant";

const ExternalEngineRegistration = z.object({
  name: z.string().check(z.minLength(3)).check(z.maxLength(200)),
  maxThreads: z.int().check(z.minimum(1)).check(z.maximum(65536)),
  maxHash: z.int().check(z.minimum(1)).check(z.maximum(1048576)),
  variants: z.optional(z.array(UciVariant)),
  providerSecret: z.string().check(z.minLength(16)).check(z.maxLength(1024)),
  providerData: z.optional(z.string()),
});

type ExternalEngineRegistration = z.infer<typeof ExternalEngineRegistration>;

export { ExternalEngineRegistration };
