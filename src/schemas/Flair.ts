import * as z from "zod/mini";

const Flair = z.string();

type Flair = z.infer<typeof Flair>;

export { Flair };
