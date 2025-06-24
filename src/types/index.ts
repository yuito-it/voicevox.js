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

export type SpeakerStyle = {
  name: string;
  id: number;
  type: "talk" | "singing_teacher" | "frame_decode" | "sing";
};

export type SpeakerListData = {
  name: string;
  speakerUuid: string;
  styles: SpeakerStyle[];
  version: string;
  supportedFeatures?: "ALL" | "SELF_ONLY" | "NOTHING";
};

export type Speaker = {
  policy: string;
  portrait: string;
  styleInfos: [
    {
      id: number;
      icon: string;
      portrait?: string;
      voiceSamples: string[];
    }
  ];
};
