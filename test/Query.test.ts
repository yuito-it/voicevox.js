import { expect, test } from "bun:test";

import { RPC, Query } from "../src";

test("Query constructor", async () => {
  await RPC.connect("http://localhost:50021/");
  expect(RPC.rpc).toBeDefined();

  const query = await Query.getTalkQuery("test", 0);
  expect(query).toBeDefined();
});

test("Query getTalkQuery with empty text", async () => {
  await RPC.connect("http://localhost:50021/");
  expect(RPC.rpc).toBeDefined();

  try {
    await Query.getTalkQuery("", 0);
  } catch (error) {
    expect(error.message).toBe("Text cannot be empty.");
  }
  await RPC.disconnect();
});

test("Query getTalkQuery with negative speaker", async () => {
  await RPC.connect("http://localhost:50021/");
  expect(RPC.rpc).toBeDefined();

  try {
    await Query.getTalkQuery("test", -1);
  } catch (error) {
    expect(error.message).toBe("Speaker must be a non-negative integer.");
  }
  await RPC.disconnect();
});
