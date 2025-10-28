import * as z from "zod";

async function handle_accountEmail_response(response: Response) {
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

export default handle_accountEmail_response;

// get:
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
