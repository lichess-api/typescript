import * as z from "minizod";

import { MoveStreamEntry } from "./MoveStreamEntry";

const MoveStream = z.array(MoveStreamEntry);

type MoveStream = z.infer<typeof MoveStream>;

export { MoveStream };
