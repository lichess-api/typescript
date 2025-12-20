import * as z from "zod";

const Patron = z.boolean();

type Patron = z.infer<typeof Patron>;

export { Patron };
