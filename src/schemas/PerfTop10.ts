import * as z from "zod/mini";

import { TopUser } from "./TopUser";

const PerfTop10 = z.tuple([
  TopUser,
  TopUser,
  TopUser,
  TopUser,
  TopUser,
  TopUser,
  TopUser,
  TopUser,
  TopUser,
  TopUser,
]);

type PerfTop10 = z.infer<typeof PerfTop10>;

export { PerfTop10 };
