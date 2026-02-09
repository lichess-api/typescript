import * as z from "zod/mini";

const FIDEPlayerPhoto = z.object({
  small: z.string(),
  medium: z.string(),
  credit: z.optional(z.string()),
});

type FIDEPlayerPhoto = z.infer<typeof FIDEPlayerPhoto>;

export { FIDEPlayerPhoto };
