import * as z from "minizod";

const Patron = z.boolean();

type Patron = z.infer<typeof Patron>;

export { Patron };
