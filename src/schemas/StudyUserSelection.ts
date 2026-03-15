import * as z from "minizod";

const StudyUserSelection = z.literal([
  "nobody",
  "owner",
  "contributor",
  "member",
  "everyone",
]);

type StudyUserSelection = z.infer<typeof StudyUserSelection>;

export { StudyUserSelection };
