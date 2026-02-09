import * as z from "zod/mini";

import { Team } from "./Team";

const TeamPaginatorJson = z.object({
  currentPage: z.int(),
  maxPerPage: z.int(),
  currentPageResults: z.array(Team),
  previousPage: z.nullable(z.int()),
  nextPage: z.nullable(z.int()),
  nbResults: z.int(),
  nbPages: z.int(),
});

type TeamPaginatorJson = z.infer<typeof TeamPaginatorJson>;

export { TeamPaginatorJson };
