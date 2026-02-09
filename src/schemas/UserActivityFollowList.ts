import * as z from "zod/mini";

const UserActivityFollowList = z.object({
  ids: z.array(z.string()),
  nb: z.optional(z.int()),
});

type UserActivityFollowList = z.infer<typeof UserActivityFollowList>;

export { UserActivityFollowList };
