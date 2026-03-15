import * as z from "minizod";

const StudyPgn = z.string();

type StudyPgn = z.infer<typeof StudyPgn>;

export { StudyPgn };
