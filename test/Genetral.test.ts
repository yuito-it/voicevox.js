import { test } from "bun:test";
import { RPC, Query, Generate } from "../src";
import fs from "fs";

test("General Test", async () => {
  await RPC.connect("http://localhost:50021");
  const speaker = 0;
  const text = "こんにちは、これはテストです。";
  const enable_interrogative_upspeak = true;
  const query = await Query.getTalkQuery(
    text,
    speaker,
    enable_interrogative_upspeak
  );
  const genDate = await Generate.generate(
    speaker,
    query,
    enable_interrogative_upspeak
  );
  await fs.promises.writeFile(`${__dirname}/general.wav`, genDate);
  await RPC.disconnect();
});
