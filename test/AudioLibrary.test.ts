import { expect, test } from "bun:test";
import { AudioLibrary } from "../src";
import { RPC } from "../src";

test("Get Singers", async () => {
  await RPC.connect("http://localhost:50021/");
  expect(RPC.rpc).toBeDefined();
  const singers = await AudioLibrary.getSingers();
  console.log(singers);
  expect(singers).toBeDefined();
  RPC.disconnect();
});

test("Get Speakers", async () => {
  await RPC.connect("http://localhost:50021/");
  expect(RPC.rpc).toBeDefined();
  const speakers = await AudioLibrary.getSpeakers();
  expect(speakers).toBeDefined();
  RPC.disconnect();
});

test("Get Speaker Info", async () => {
  const headers = {
    Authorization: `ApiKey ${process.env.VOICEVOX_API_KEY}`,
  };
  await RPC.connect("http://ysmfilm.net:53000/voicevox/", headers);
  expect(RPC.rpc).toBeDefined();
  const speakers = await AudioLibrary.getSpeakers();
  const speakerInfo = await AudioLibrary.getSpeaker(
    speakers[0].speakerUuid,
    "url"
  );
  expect(speakerInfo).toBeDefined();
  console.log(speakerInfo);
});
