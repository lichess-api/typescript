import * as z from "minizod";

const Error = z.object({ error: z.string() });

type Error = z.infer<typeof Error>;

export { Error };
