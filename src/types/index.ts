export type Mora = {
  text: string;
  consonant: string | null;
  consonantLength: number | null;
  vowel: string;
  vowelLength: number;
  pitch: number;
};

export type AccentPhrase = {
  moras: Mora[];
  accent: number;
  pauseMora: Mora | null;
  isInterrogative: boolean;
};

export type VoiceSettings = {
  accentPhrases: AccentPhrase[];
  speedScale: number;
  pitchScale: number;
  intonationScale: number;
  volumeScale: number;
  prePhonemeLength: number;
  postPhonemeLength: number;
  pauseLength: number | null;
  pauseLengthScale: number;
  outputSamplingRate: number;
  outputStereo: boolean;
  kana: string;
};

export type Note = {
  id?: string | null;
  key: number;
  frameLength: number;
  lyric: string;
};

export type Phoneme = {
  phoneme: string;
  frameLength: number;
  noteId: string;
};

export type SingingSettings = {
  f0: number[];
  volume: number[];
  phonemes: Phoneme[];
  volumeScale: number;
  outputSamplingRate: number;
  outputStereo: boolean;
};
