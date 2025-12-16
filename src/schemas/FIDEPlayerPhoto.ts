import * as z from "zod";

const FIDEPlayerPhoto = z.object({
  small: z.string(),
  medium: z.string(),
  credit: z.string().optional(),
});

type FIDEPlayerPhoto = z.infer<typeof FIDEPlayerPhoto>;

export { FIDEPlayerPhoto };
export default FIDEPlayerPhoto;
