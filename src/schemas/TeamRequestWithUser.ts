import * as z from "minizod";

import { TeamRequest } from "./TeamRequest";
import { User } from "./User";

const TeamRequestWithUser = z.object({
  request: TeamRequest,
  user: User,
});

type TeamRequestWithUser = z.infer<typeof TeamRequestWithUser>;

export { TeamRequestWithUser };
