import * as z from "zod/mini";

import { MoveStreamEntry } from "./MoveStreamEntry";

const MoveStream = z.array(MoveStreamEntry);

type MoveStream = z.infer<typeof MoveStream>;

export { MoveStream };
