import * as z from "zod/mini";

const Speed = z.literal([
  "ultraBullet",
  "bullet",
  "blitz",
  "rapid",
  "classical",
  "correspondence",
]);

type Speed = z.infer<typeof Speed>;

export { Speed };
