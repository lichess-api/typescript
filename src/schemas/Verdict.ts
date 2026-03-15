import * as z from "minizod";

const Verdict = z.object({
  condition: z.string(),
  verdict: z.string(),
});

type Verdict = z.infer<typeof Verdict>;

export { Verdict };
