import * as z from "minizod";

import { TopUser } from "./TopUser";

const Leaderboard = z.object({ users: z.array(TopUser) });

type Leaderboard = z.infer<typeof Leaderboard>;

export { Leaderboard };
