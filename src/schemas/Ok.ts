import * as z from "zod/mini";

const Ok = z.object({ ok: z.boolean() });

type Ok = z.infer<typeof Ok>;

export { Ok };
