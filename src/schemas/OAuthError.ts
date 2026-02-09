import * as z from "zod/mini";

const OAuthError = z.object({
  error: z.string(),
  error_description: z.optional(z.string()),
});

type OAuthError = z.infer<typeof OAuthError>;

export { OAuthError };
