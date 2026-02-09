import * as z from "zod/mini";

const StudyImportPgnChapters = z.object({
  chapters: z.optional(
    z.array(
      z.object({
        id: z.optional(z.string()),
        name: z.optional(z.string()),
        players: z.optional(
          z.tuple([
            z.object({
              name: z.optional(z.nullable(z.string())),
              rating: z.optional(z.int()),
            }),
            z.object({
              name: z.optional(z.nullable(z.string())),
              rating: z.optional(z.int()),
            }),
          ]),
        ),
        status: z.optional(z.string()),
      }),
    ),
  ),
});

type StudyImportPgnChapters = z.infer<typeof StudyImportPgnChapters>;

export { StudyImportPgnChapters };
