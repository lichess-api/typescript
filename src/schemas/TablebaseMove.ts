import * as z from "zod/mini";

const TablebaseMove = z.object({
  uci: z.string(),
  san: z.string(),
  category: z.literal([
    "loss",
    "unknown",
    "syzygy-loss",
    "maybe-loss",
    "blessed-loss",
    "draw",
    "cursed-win",
    "maybe-win",
    "syzygy-win",
    "win",
  ]),
  dtz: z.optional(z.nullable(z.int())),
  precise_dtz: z.optional(z.nullable(z.int())),
  dtc: z.optional(z.nullable(z.int())),
  dtm: z.optional(z.nullable(z.int())),
  dtw: z.optional(z.nullable(z.int())),
  zeroing: z.optional(z.boolean()),
  conversion: z.optional(z.boolean()),
  checkmate: z.optional(z.boolean()),
  stalemate: z.optional(z.boolean()),
  variant_win: z.optional(z.boolean()),
  variant_loss: z.optional(z.boolean()),
  insufficient_material: z.optional(z.boolean()),
});

type TablebaseMove = z.infer<typeof TablebaseMove>;

export { TablebaseMove };
