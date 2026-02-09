import * as z from "zod/mini";

const GameStatusName = z.literal([
  "created",
  "started",
  "aborted",
  "mate",
  "resign",
  "stalemate",
  "timeout",
  "draw",
  "outoftime",
  "cheat",
  "noStart",
  "unknownFinish",
  "insufficientMaterialClaim",
  "variantEnd",
]);

type GameStatusName = z.infer<typeof GameStatusName>;

export { GameStatusName };
