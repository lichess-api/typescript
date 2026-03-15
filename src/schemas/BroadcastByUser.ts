import * as z from "minizod";

import { BroadcastTour } from "./BroadcastTour";

const BroadcastByUser = z.object({ tour: BroadcastTour });

type BroadcastByUser = z.infer<typeof BroadcastByUser>;

export { BroadcastByUser };
