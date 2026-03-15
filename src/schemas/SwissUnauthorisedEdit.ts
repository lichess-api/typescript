import * as z from "minizod";

const SwissUnauthorisedEdit = z.object({ error: z.optional(z.string()) });

type SwissUnauthorisedEdit = z.infer<typeof SwissUnauthorisedEdit>;

export { SwissUnauthorisedEdit };
