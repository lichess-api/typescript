import * as z from "zod";

import { UciVariant } from "./UciVariant";

const ExternalEngineWorkCommon = z.object({
  sessionId: z.string(),
  threads: z.int().min(1),
  hash: z.int().min(1),
  multiPv: z.literal([1, 2, 3, 4, 5]),
  variant: UciVariant,
  initialFen: z.string(),
  moves: z.array(z.string()),
});

type ExternalEngineWorkCommon = z.infer<typeof ExternalEngineWorkCommon>;

export { ExternalEngineWorkCommon };
export default ExternalEngineWorkCommon;
