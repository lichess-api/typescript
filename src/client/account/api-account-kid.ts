import * as z from "zod";

import { BASE_URL } from "~/constants";

import { addQueryParams } from "~/utils";

import { Ok } from "~/schemas";

/**
 * Read the kid mode status of the logged in user.
 * - <https://lichess.org/account/kid>
 */
export async function accountKid() {
  const baseUrl = BASE_URL;
  const path = "/api/account/kid" as const;
  const url = new URL(path, baseUrl);
  const request = new Request(url, { method: "GET" });
  const response = await fetch(request);
  const status = response.status;
  switch (status) {
    case 200: {
      const schema = z.object({ kid: z.boolean() });
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
//   operationId: accountKid
//   summary: Get my kid mode status
//   description: |
//     Read the kid mode status of the logged in user.
//     - <https://lichess.org/account/kid>
//   security:
//     - OAuth2: ["preference:read"]
//   responses:
//     "200":
//       description: The kid mode status of the logged in user.
//       headers:
//         Access-Control-Allow-Origin:
//           schema:
//             type: string
//             default: "'*'"
//       content:
//         application/json:
//           schema:
//             properties:
//               kid:
//                 type: boolean

/**
 * Set the kid mode status of the logged in user.
 * - <https://lichess.org/account/kid>
 */
export async function accountKidPost({ query }: { query: { v: boolean } }) {
  const baseUrl = BASE_URL;
  const path = "/api/account/kid" as const;
  const url = new URL(path, baseUrl);
  addQueryParams(url, query);
  const request = new Request(url, { method: "POST" });
  const response = await fetch(request);
  const status = response.status;
  switch (status) {
    case 200: {
      const schema = Ok;
      const json: unknown = await response.json();
      const data = schema.parse(json);
      return { status, data } as const;
    }
    default: {
      throw new Error("Error");
    }
  }
}

// post:
//   operationId: accountKidPost
//   summary: Set my kid mode status
//   description: |
//     Set the kid mode status of the logged in user.
//     - <https://lichess.org/account/kid>
//   security:
//     - OAuth2: ["preference:write"]
//   parameters:
//     - in: query
//       name: v
//       required: true
//       description: Kid mode status
//       schema:
//         type: boolean
//       example: true
//   responses:
//     "200":
//       description: The kid mode status was set successfully for the logged in user.
//       headers:
//         Access-Control-Allow-Origin:
//           schema:
//             type: string
//             default: "'*'"
//       content:
//         application/json:
//           schema:
//             $ref: "../../schemas/Ok.yaml"
