import * as z from "zod/mini";

const Verdict = z.object({
  condition: z.string(),
  verdict: z.string(),
});

type Verdict = z.infer<typeof Verdict>;

export { Verdict };
