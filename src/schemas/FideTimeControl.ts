import * as z from "minizod";

const FideTimeControl = z.literal(["standard", "rapid", "blitz"]);

type FideTimeControl = z.infer<typeof FideTimeControl>;

export { FideTimeControl };
