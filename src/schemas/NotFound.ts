import * as z from "minizod";

const NotFound = z.object({ error: z.string() });

type NotFound = z.infer<typeof NotFound>;

export { NotFound };
