import * as z from "zod/mini";

import { UciVariant } from "./UciVariant";

const ExternalEngineWorkCommon = z.object({
  sessionId: z.string(),
  threads: z.int().check(z.minimum(1)),
  hash: z.int().check(z.minimum(1)),
  multiPv: z.literal([1, 2, 3, 4, 5]),
  variant: UciVariant,
  initialFen: z.string(),
  moves: z.array(z.string()),
});

type ExternalEngineWorkCommon = z.infer<typeof ExternalEngineWorkCommon>;

export { ExternalEngineWorkCommon };
