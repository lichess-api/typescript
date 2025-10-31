import * as z from "zod";

const PatronColor = z.literal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

type PatronColor = z.infer<typeof PatronColor>;

export { PatronColor };
export default PatronColor;
