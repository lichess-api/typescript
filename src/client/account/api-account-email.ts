import * as z from "zod";

import { BASE_URL } from "~/constants";

/**
 * Read the email address of the logged in user.
 */
export async function accountEmail() {
  const baseUrl = BASE_URL;
  const path = "/api/account/email" as const;
  const url = new URL(path, baseUrl);
  const request = new Request(url, { method: "GET" });
  const response = await fetch(request);
  const status = response.status;
  switch (status) {
    case 200: {
      const schema = z.object({ email: z.string() });
      const json: unknown = await response.json();
      const data = schema.parse(json);
      return { status, data } as const;
    }
    default: {
      throw new Error("Error");
    }
  }
}

// get:
//  security:
//    - OAuth2: ["email:read"]
//   responses:
//     "200":
//       headers:
//         Access-Control-Allow-Origin:
//           schema:
//             type: string
//             default: "'*'"
//       content:
//         application/json:
//           schema:
//             properties:
//               email:
//                 type: string
