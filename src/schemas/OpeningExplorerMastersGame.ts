import * as z from "zod/mini";

import { GameColor } from "./GameColor";
import { OpeningExplorerGamePlayer } from "./OpeningExplorerGamePlayer";

const OpeningExplorerMastersGame = z.object({
  id: z.string(),
  winner: z.union([GameColor, z.null()]),
  white: OpeningExplorerGamePlayer,
  black: OpeningExplorerGamePlayer,
  year: z.int(),
  month: z.optional(z.string()),
});

type OpeningExplorerMastersGame = z.infer<typeof OpeningExplorerMastersGame>;

export { OpeningExplorerMastersGame };
