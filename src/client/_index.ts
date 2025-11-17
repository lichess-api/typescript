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

  /**
   * Read the email address of the logged in user.
   */
  async accountEmail() {
    const path = "/api/account/email" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const json = await response.clone().json();
        const schema = z.object({ email: z.string() });
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Read the kid mode status of the logged in user.
   * - <https://lichess.org/account/kid>
   */
  async accountKid() {
    const path = "/api/account/kid" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const json = await response.clone().json();
        const schema = z.object({ kid: z.boolean() });
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Set the kid mode status of the logged in user.
   * - <https://lichess.org/account/kid>
   */
  async accountKidPost(params: { v: boolean }) {
    const path = "/api/account/kid" as const;
    const query = params;
    const { response, status } = await this.requestor.post({ path, query });
    switch (status) {
      case 200: {
        const json = await response.clone().json();
        const schema = schemas.Ok;
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Read the preferences of the logged in user.
   * - <https://lichess.org/account/preferences/game-display>
   * - <https://github.com/ornicar/lila/blob/master/modules/pref/src/main/Pref.scala>
   */
  async account() {
    const path = "/api/account/preferences" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const json = await response.clone().json();
        const schema = z.object({
          prefs: schemas.UserPreferences,
          language: z.string(),
        });
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }
}
