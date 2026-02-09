import * as z from "zod/mini";

import { TvFeedFeatured } from "./TvFeedFeatured";
import { TvFeedFen } from "./TvFeedFen";

const TvFeed = z.union([TvFeedFeatured, TvFeedFen]);

type TvFeed = z.infer<typeof TvFeed>;

export { TvFeed };
