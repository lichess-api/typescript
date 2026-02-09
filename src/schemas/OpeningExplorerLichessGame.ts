import * as z from "zod/mini";

import { GameColor } from "./GameColor";
import { OpeningExplorerGamePlayer } from "./OpeningExplorerGamePlayer";
import { Speed } from "./Speed";

const OpeningExplorerLichessGame = z.object({
  id: z.string(),
  winner: z.union([GameColor, z.null()]),
  speed: z.optional(Speed),
  white: OpeningExplorerGamePlayer,
  black: OpeningExplorerGamePlayer,
  year: z.number(),
  month: z.nullable(z.string()),
});

type OpeningExplorerLichessGame = z.infer<typeof OpeningExplorerLichessGame>;

export { OpeningExplorerLichessGame };
