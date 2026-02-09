import * as z from "zod/mini";

import { ExternalEngineWorkCommon } from "./ExternalEngineWorkCommon";

const ExternalEngineWork = z.union([
  z.intersection(
    z.object({ movetime: z.int().check(z.minimum(1)) }),
    ExternalEngineWorkCommon,
  ),
  z.intersection(
    z.object({ depth: z.int().check(z.minimum(1)) }),
    ExternalEngineWorkCommon,
  ),
  z.intersection(
    z.object({ nodes: z.int().check(z.minimum(1)) }),
    ExternalEngineWorkCommon,
  ),
]);

type ExternalEngineWork = z.infer<typeof ExternalEngineWork>;

export { ExternalEngineWork };
