import * as z from "minizod";

const BadRequestError = z.object({ error: z.string() });

type BadRequestError = z.infer<typeof BadRequestError>;

export { BadRequestError };
