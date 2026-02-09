import * as z from "zod/mini";

const NotFound = z.object({ error: z.string() });

type NotFound = z.infer<typeof NotFound>;

export { NotFound };
