import * as z from "zod/mini";

const TimelineEntryBlogPost = z.object({
  type: z.literal(["blog-post"]),
  date: z.number(),
  data: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
  }),
});

type TimelineEntryBlogPost = z.infer<typeof TimelineEntryBlogPost>;

export { TimelineEntryBlogPost };
