import { rpc } from "./rpc";
import { VoiceSettings } from "./types";

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
    accent_phrases: query.accentPhrases.map((phrase) => ({
      moras: phrase.moras.map((mora) => ({
        text: mora.text,
        consonant: mora.consonant,
        consonant_length: mora.consonantLength,
        vowel: mora.vowel,
        vowel_length: mora.vowelLength,
        pitch: mora.pitch,
      })),
      accent: phrase.accent,
      pause_mora: phrase.pauseMora
        ? {
            text: phrase.pauseMora.text,
            consonant: phrase.pauseMora.consonant,
            consonant_length: phrase.pauseMora.consonantLength,
            vowel: phrase.pauseMora.vowel,
            vowel_length: phrase.pauseMora.vowelLength,
            pitch: phrase.pauseMora.pitch,
          }
        : null,
      is_interrogative: phrase.isInterrogative,
    })),

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
