import { expect, test } from "bun:test";
import { RPC } from "../src";

test("RPC connect function", async () => {
  // Test with valid base URL
  await RPC.connect("http://localhost:50021/");
  expect(RPC.rpc).toBeDefined();

  // Test with invalid base URL
  try {
    await RPC.connect("");
  } catch (error) {
    expect(error.message).toBe("Base URL for Voicebox API is not defined.");
  }

  // Test disconnect function
  await RPC.disconnect();
  expect(RPC.rpc).toBeUndefined();
});

test("RPC connect with headers", async () => {
  // Test with valid base URL and headers
  const headers = {
    Authorization: `ApiKey ${process.env.VOICEBOX_API_KEY}`,
  };
  await RPC.connect("http://ysmfilm.net:53000/voicevox/", headers);
  expect(RPC.rpc).toBeDefined();

  await RPC.disconnect();
  expect(RPC.rpc).toBeUndefined();
});
