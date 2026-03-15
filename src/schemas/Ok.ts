import * as z from "minizod";

const Ok = z.object({ ok: z.boolean() });

type Ok = z.infer<typeof Ok>;

export { Ok };
