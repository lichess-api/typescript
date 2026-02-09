import * as z from "zod/mini";

const OpeningExplorerGamePlayer = z.object({
  name: z.string(),
  rating: z.int(),
});

type OpeningExplorerGamePlayer = z.infer<typeof OpeningExplorerGamePlayer>;

export { OpeningExplorerGamePlayer };
