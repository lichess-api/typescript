import handle_accountEmail_response from "./account/api-account-email";

const API_URL = "https://lichess.org" as const;

/**
 * Read the email address of the logged in user.
 */
export async function accountEmail() {
  const apiUrl = API_URL;
  const path = "/api/account/email" as const;
  const url = new URL(apiUrl, path);
  const request = new Request(url);
  const response = await fetch(request);
  return handle_accountEmail_response(response);
}
