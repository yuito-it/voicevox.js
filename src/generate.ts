import { rpc } from "./rpc";
import { VoiceSettings } from "./types";
import { toSnakeCaseKeys } from "./utils";

export const generate = async (
  speaker: number,
  query: VoiceSettings,
  enableInterrogativeUpspeak: boolean | null = true,
  version?: string | null
) => {
  if (!rpc) {
    throw new Error(
      "Voicebox API is not connected. Please call connect() first."
    );
  }
  if (speaker < 0) {
    throw new Error("Speaker must be a non-negative integer.");
  }

  const sendData = {
    accent_phrases: toSnakeCaseKeys(query.accentPhrases),
    speedScale: query.speedScale,
    pitchScale: query.pitchScale,
    intonationScale: query.intonationScale,
    volumeScale: query.volumeScale,
    prePhonemeLength: query.prePhonemeLength,
    postPhonemeLength: query.postPhonemeLength,
    outputSamplingRate: query.outputSamplingRate,
    outputStereo: query.outputStereo,
    pauseLengthScale: query.pauseLengthScale,
    kana: null,
  };

  try {
    const response = await rpc.post("/synthesis", sendData, {
      params: {
        speaker,
        enable_interrogative_upspeak: enableInterrogativeUpspeak,
        core_version: version,
      },
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Voicebox API returned status code ${response.status}(${response.statusText})`
      );
    }

    const audioBuffers: Buffer[] = [];
    audioBuffers.push(Buffer.from(response.data));
    const combinedAudio = Buffer.concat(audioBuffers);
    return combinedAudio;
  } catch (error) {
    throw new Error(`Failed to generate audio: ${error}`);
  }
};
