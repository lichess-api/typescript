import * as z from "zod/mini";

const Patron = z.boolean();

type Patron = z.infer<typeof Patron>;

export { Patron };
