import { RPC, Query, Generate } from "../src";
import { test } from "bun:test";
import fs from "fs";

test("Generate", async () => {
  await RPC.connect("http://localhost:50021");
  const speaker = 47;
  const generateData = {
    accentPhrases: [
      {
        moras: [
          {
            text: "コ",
            consonant: "k",
            consonantLength: 0.07622023671865463,
            vowel: "o",
            vowelLength: 0.13150008022785187,
            pitch: 5.739943981170654,
          },
          {
            text: "ン",
            consonant: null,
            consonantLength: null,
            vowel: "N",
            vowelLength: 0.058612629771232605,
            pitch: 5.827127456665039,
          },
          {
            text: "ニ",
            consonant: "n",
            consonantLength: 0.029203323647379875,
            vowel: "i",
            vowelLength: 0.08908789604902267,
            pitch: 5.8562703132629395,
          },
          {
            text: "チ",
            consonant: "ch",
            consonantLength: 0.08553846925497055,
            vowel: "i",
            vowelLength: 0.05529806390404701,
            pitch: 5.8370747566223145,
          },
          {
            text: "ワ",
            consonant: "w",
            consonantLength: 0.06517333537340164,
            vowel: "a",
            vowelLength: 0.1556410789489746,
            pitch: 5.829637050628662,
          },
        ],
        accent: 5,
        pauseMora: {
          text: "、",
          consonant: null,
          consonantLength: null,
          vowel: "pau",
          vowelLength: 0.2845994532108307,
          pitch: 0,
        },
        isInterrogative: false,
      },
      {
        moras: [
          {
            text: "コ",
            consonant: "k",
            consonantLength: 0.06867305189371109,
            vowel: "o",
            vowelLength: 0.0530439130961895,
            pitch: 5.593937873840332,
          },
          {
            text: "レ",
            consonant: "r",
            consonantLength: 0.03300300985574722,
            vowel: "e",
            vowelLength: 0.07265042513608932,
            pitch: 5.697817325592041,
          },
          {
            text: "ワ",
            consonant: "w",
            consonantLength: 0.05230628699064255,
            vowel: "a",
            vowelLength: 0.0848768949508667,
            pitch: 5.831372261047363,
          },
        ],
        accent: 3,
        pauseMora: null,
        isInterrogative: false,
      },
      {
        moras: [
          {
            text: "テ",
            consonant: "t",
            consonantLength: 0.061835721135139465,
            vowel: "e",
            vowelLength: 0.07924549281597137,
            pitch: 5.928937911987305,
          },
          {
            text: "ス",
            consonant: "s",
            consonantLength: 0.028420640155673027,
            vowel: "U",
            vowelLength: 0.05967824161052704,
            pitch: 0,
          },
          {
            text: "ト",
            consonant: "t",
            consonantLength: 0.06472934782505035,
            vowel: "o",
            vowelLength: 0.06277397274971008,
            pitch: 5.867567539215088,
          },
          {
            text: "デ",
            consonant: "d",
            consonantLength: 0.05031651630997658,
            vowel: "e",
            vowelLength: 0.0876912921667099,
            pitch: 5.604641437530518,
          },
          {
            text: "ス",
            consonant: "s",
            consonantLength: 0.07036548107862473,
            vowel: "U",
            vowelLength: 0.11378935724496841,
            pitch: 0,
          },
        ],
        accent: 1,
        pauseMora: null,
        isInterrogative: false,
      },
    ],
    speedScale: 1,
    pitchScale: 0,
    intonationScale: 1,
    volumeScale: 1,
    prePhonemeLength: 0.1,
    postPhonemeLength: 0.1,
    pauseLength: null,
    pauseLengthScale: 1,
    outputSamplingRate: 24000,
    outputStereo: false,
    kana: "コンニチワ'、コレワ'/テ'_ストデ_ス",
  };
  const audio = await Generate.generate(speaker, generateData, true);
  if (audio instanceof Buffer) {
    console.log("Audio generated successfully, length:", audio.length);
  } else {
    throw new Error("Audio generation failed, expected Buffer type.");
  }
  fs.writeFileSync(`${__dirname}/generate.wav`, audio);
  await RPC.disconnect();
});
