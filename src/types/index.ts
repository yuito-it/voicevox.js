type Mora = {
  text: string;
  consonant: string;
  consonantLength: number;
  vowel: string;
  vowelLength: number;
  pitch: number;
};

type AccentPhrase = {
  moras: Mora[];
  accent: number;
  pauseMora: Mora;
  isInterrogative: boolean;
};

type VoiceSettings = {
  accentPhrases: AccentPhrase[];
  speedScale: number;
  pitchScale: number;
  intonationScale: number;
  volumeScale: number;
  prePhonemeLength: number;
  postPhonemeLength: number;
  pauseLength: number;
  pauseLengthScale: number;
  outputSamplingRate: number;
  outputStereo: boolean;
  kana: string;
};

type Note = {
  id?: string | null;
  key: number;
  frameLength: number;
  lyric: string;
};

type Phoneme = {
  phoneme: string;
  frameLength: number;
  noteId: string;
};

type SingingSettings = {
  f0: number[];
  volume: number[];
  phonemes: Phoneme[];
  volumeScale: number;
  outputSamplingRate: number;
  outputStereo: boolean;
};
