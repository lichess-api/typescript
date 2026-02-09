import * as z from "zod/mini";

import { VariantKey } from "./VariantKey";

const Variant = z.object({
  key: VariantKey,
  name: z.string(),
  short: z.optional(z.string()),
});

type Variant = z.infer<typeof Variant>;

export { Variant };
