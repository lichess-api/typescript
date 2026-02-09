import * as z from "zod/mini";

const Error = z.object({ error: z.string() });

type Error = z.infer<typeof Error>;

export { Error };
