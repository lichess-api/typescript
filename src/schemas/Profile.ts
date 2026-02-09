import * as z from "zod/mini";

const Profile = z.object({
  flag: z.optional(z.string()),
  location: z.optional(z.string()),
  bio: z.optional(z.string()),
  realName: z.optional(z.string()),
  fideRating: z.optional(z.int()),
  uscfRating: z.optional(z.int()),
  ecfRating: z.optional(z.int()),
  cfcRating: z.optional(z.int()),
  rcfRating: z.optional(z.int()),
  dsbRating: z.optional(z.int()),
  links: z.optional(z.string()),
});

type Profile = z.infer<typeof Profile>;

export { Profile };
