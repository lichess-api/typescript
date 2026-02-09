import * as z from "zod/mini";

import { TopUser } from "./TopUser";

const Leaderboard = z.object({ users: z.array(TopUser) });

type Leaderboard = z.infer<typeof Leaderboard>;

export { Leaderboard };
