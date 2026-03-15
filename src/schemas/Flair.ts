import * as z from "minizod";

const Flair = z.string();

type Flair = z.infer<typeof Flair>;

export { Flair };
