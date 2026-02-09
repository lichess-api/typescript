import * as z from "zod/mini";

import { BroadcastTour } from "./BroadcastTour";

const BroadcastByUser = z.object({ tour: BroadcastTour });

type BroadcastByUser = z.infer<typeof BroadcastByUser>;

export { BroadcastByUser };
