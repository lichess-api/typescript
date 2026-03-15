import * as z from "minizod";

import { RatingHistoryEntry } from "./RatingHistoryEntry";

const RatingHistory = z.array(RatingHistoryEntry);

type RatingHistory = z.infer<typeof RatingHistory>;

export { RatingHistory };
