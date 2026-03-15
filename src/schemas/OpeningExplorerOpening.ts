import * as z from "minizod";

const OpeningExplorerOpening = z.object({
  eco: z.string(),
  name: z.string(),
});

type OpeningExplorerOpening = z.infer<typeof OpeningExplorerOpening>;

export { OpeningExplorerOpening };
