import { expect, test } from "bun:test";
import { AudioLibrary } from "../src";
import { RPC } from "../src";

test("Get Singers", async () => {
  await RPC.connect("http://localhost:50021/");
  expect(RPC.rpc).toBeDefined();
  const singers = await AudioLibrary.getSingers();
  console.log(singers);
  expect(singers).toBeDefined();
});

test("Get Speakers", async () => {
  await RPC.connect("http://localhost:50021/");
  expect(RPC.rpc).toBeDefined();
  const speakers = await AudioLibrary.getSpeakers();
  expect(speakers).toBeDefined();
});
