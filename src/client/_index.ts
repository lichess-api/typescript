import * as z from "zod";

import * as schemas from "~/schemas";

import { Requestor } from "./requestor";

export const BASE_URL = "https://lichess.org";
type BASE_URL = typeof BASE_URL;

export class Lichess {
  private readonly requestor: Requestor<BASE_URL>;

  constructor({ token }: { token: string }) {
    this.requestor = new Requestor({ token, baseUrl: BASE_URL });
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

  /**
   * Read the email address of the logged in user.
   */
  async accountEmail() {
    const path = "/api/account/email" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({ email: z.string() });
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
   * Read the kid mode status of the logged in user.
   * - <https://lichess.org/account/kid>
   */
  async accountKid() {
    const path = "/api/account/kid" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({ kid: z.boolean() });
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

  /**
   * Set the kid mode status of the logged in user.
   * - <https://lichess.org/account/kid>
   */
  async accountKidPost({ query }: { query: { v: boolean } }) {
    const path = "/api/account/kid" as const;
    const { json, status } = await this.requestor.post({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  // get:
  //   operationId: account
  //   summary: Get my preferences
  //   description: |
  //     Read the preferences of the logged in user.
  //     - <https://lichess.org/account/preferences/game-display>
  //     - <https://github.com/ornicar/lila/blob/master/modules/pref/src/main/Pref.scala>
  //   security:
  //     - OAuth2: ["preference:read"]
  //   responses:
  //     "200":
  //       description: The preferences of the logged in user.
  //       headers:
  //         Access-Control-Allow-Origin:
  //           schema:
  //             type: string
  //             default: "'*'"
  //       content:
  //         application/json:
  //           schema:
  //             properties:
  //               prefs:
  //                 $ref: "../../schemas/UserPreferences.yaml"
  //               language:
  //                 type: string
  //                 example: en-GB

  /**
   * Read the preferences of the logged in user.
   * - <https://lichess.org/account/preferences/game-display>
   * - <https://github.com/ornicar/lila/blob/master/modules/pref/src/main/Pref.scala>
   */
  async account() {
    const path = "/api/account/kid" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({
          prefs: schemas.UserPreferences,
          language: z.string(),
        });
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }
}
