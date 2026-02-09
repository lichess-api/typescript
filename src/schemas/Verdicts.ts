import * as z from "zod/mini";

import { Verdict } from "./Verdict";

const Verdicts = z.object({
  accepted: z.boolean(),
  list: z.array(Verdict),
});

type Verdicts = z.infer<typeof Verdicts>;

export { Verdicts };
