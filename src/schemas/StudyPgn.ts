import * as z from "zod/mini";

const StudyPgn = z.string();

type StudyPgn = z.infer<typeof StudyPgn>;

export { StudyPgn };
