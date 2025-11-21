import { Lichess } from "~/.";

import { describe, it, expect } from "bun:test";

describe("Lichess", () => {
  it("should work", () => {
    const lichess = new Lichess({ token: null });
    expect(lichess).toBeDefined();
  });

  it("should correctly make a simple request", async () => {
    const lichess = new Lichess({ token: null });
    const liveStreamers = (await lichess.streamerLive()).data;
    expect(liveStreamers).toBeArray();
  });
});
