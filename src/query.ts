import type { Note, SingingSettings, VoiceSettings } from "./types";
import { rpc } from "./rpc";
import { toCamelCaseKeys } from "./utils";

export const getTalkQuery = async (
  text: string,
  speaker: number,
  enableKatakanaEnglish: boolean = true,
  version?: string | null
): Promise<VoiceSettings> => {
  if (!rpc) {
    throw new Error(
      "Voicebox API is not connected. Please call connect() first."
    );
  }
  if (text.trim() === "") {
    throw new Error("Text cannot be empty.");
  }
  if (speaker < 0) {
    throw new Error("Speaker must be a non-negative integer.");
  }
  try {
    const response = await rpc.post("/audio_query", null, {
      params: {
        text,
        speaker,
        enable_katakana_english: enableKatakanaEnglish,
        core_version: version,
      },
    });
    if (response.status !== 200) {
      throw new Error(
        `Voicebox API returned status code ${response.status}(${response.statusText})`
      );
    }
    const data = toCamelCaseKeys(response.data) as VoiceSettings;
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch voice settings from Voicebox API: ${error}`
    );
  }
};

export const getTalkQueryWithPreset = async (
  text: string,
  preset: number,
  enableKatakanaEnglish: boolean = true,
  version?: string | null
): Promise<VoiceSettings> => {
  if (!rpc) {
    throw new Error(
      "Voicebox API is not connected. Please call connect() first."
    );
  }
  if (text.trim() === "") {
    throw new Error("Text cannot be empty.");
  }
  if (preset < 0) {
    throw new Error("Preset must be a non-negative integer.");
  }
  try {
    const response = await rpc.post("/audio_query_from_preset", null, {
      params: {
        text,
        preset_id: preset,
        enable_katakana_english: enableKatakanaEnglish,
        core_version: version,
      },
    });
    if (response.status !== 200) {
      throw new Error(
        `Voicebox API returned status code ${response.status}(${response.statusText})`
      );
    }
    const data = {
      ...response.data,
      accentPhrases: response.data.accent_phrases.map((phrase: any) => ({
        moras: phrase.moras.map((mora: any) => ({
          text: mora.text,
          consonant: mora.consonant,
          consonantLength: mora.consonant_length,
          vowel: mora.vowel,
          vowelLength: mora.vowel_length,
          pitch: mora.pitch,
        })),
        accent: phrase.accent,
        pauseMora: phrase.pause_mora,
        isInterrogative: phrase.is_interrogative,
      })),
    } as VoiceSettings;

    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch voice settings from Voicebox API: ${error}`
    );
  }
};

export const getSingQuery = async (
  speaker: number,
  notes: Note[],
  version?: string | null
): Promise<SingingSettings> => {
  if (!rpc) {
    throw new Error(
      "Voicebox API is not connected. Please call connect() first."
    );
  }
  if (speaker < 0) {
    throw new Error("Speaker must be a non-negative integer.");
  }
  const sendData = notes.map((note) => ({
    id: note.id?.toString() || null,
    key: note.key,
    frame_length: note.frameLength,
    lyric: note.lyric,
  }));
  try {
    const response = await rpc.post(
      "/sing_frame_audio_query",
      { notes: sendData },
      {
        params: {
          speaker,
          core_version: version,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(
        `Voicebox API returned status code ${response.status}(${response.statusText})`
      );
    }
    const data = {
      ...response.data,
      phonemes: response.data.phonemes.map((phoneme: any) => ({
        ...phoneme,
        noteId: phoneme.note_id,
        frameLength: phoneme.frame_length,
      })),
    } as SingingSettings;
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch voice settings from Voicebox API: ${error}`
    );
  }
};
