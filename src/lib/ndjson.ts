import * as z from "zod";

async function* ndjsonStream<T>({
  response,
  schema,
}: {
  response: Response;
  schema: z.ZodType<T>;
}): AsyncGenerator<T, void, undefined> {
  if (!response.body) {
    throw new Error("Response has no body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (line.trim() === "") continue;
        yield schema.parse(JSON.parse(line));
      }
    }

    if (buffer.trim() !== "") {
      yield schema.parse(JSON.parse(buffer));
    }
  } finally {
    reader.releaseLock();
  }
}

export { ndjsonStream };
