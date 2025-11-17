import { Lichess } from "~/.";

import { describe, it, expect } from "bun:test";

describe("Lichess", () => {
  it("should work", () => {
    const lichess = new Lichess({ token: "" });
    expect(lichess).toBeDefined();
  });
});
