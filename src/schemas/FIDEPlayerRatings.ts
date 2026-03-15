import * as z from "minizod";

const FIDEPlayerRatings = z.object({
  standard: z.array(z.number()),
  rapid: z.array(z.number()),
  blitz: z.array(z.number()),
});

type FIDEPlayerRatings = z.infer<typeof FIDEPlayerRatings>;

export { FIDEPlayerRatings };
