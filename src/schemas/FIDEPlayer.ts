import * as z from "zod/mini";

import { FIDEPlayerPhoto } from "./FIDEPlayerPhoto";
import { Title } from "./Title";

const FIDEPlayer = z.object({
  id: z.int(),
  name: z.string(),
  title: z.optional(Title),
  federation: z.string(),
  year: z.optional(z.nullable(z.int())),
  inactive: z.optional(z.int()),
  standard: z.optional(z.int()),
  rapid: z.optional(z.int()),
  blitz: z.optional(z.int()),
  photo: z.optional(FIDEPlayerPhoto),
});

type FIDEPlayer = z.infer<typeof FIDEPlayer>;

export { FIDEPlayer };
