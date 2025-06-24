import { rpc } from "./rpc";
import { Speaker, SpeakerListData } from "./types";
import { toCamelCaseKeys } from "./utils";

export const getSingers = async (
  version?: string | null
): Promise<Array<SpeakerListData>> => {
  if (!rpc) {
    throw new Error(
      "Voicebox API is not connected. Please call connect() first."
    );
  }

  try {
    const response = await rpc.get("/singers", {
      params: { core_version: version },
    });

    if (response.status !== 200) {
      throw new Error(
        `Voicebox API returned status code ${response.status}(${response.statusText})`
      );
    }

    return toCamelCaseKeys(response.data) as Array<SpeakerListData>;
  } catch (error) {
    throw new Error(`Failed to fetch singers: ${error}`);
  }
};

export const getSpeakers = async (
  version?: string | null
): Promise<Array<SpeakerListData>> => {
  if (!rpc) {
    throw new Error(
      "Voicebox API is not connected. Please call connect() first."
    );
  }

  try {
    const response = await rpc.get("/speakers", {
      params: { core_version: version },
    });

    if (response.status !== 200) {
      throw new Error(
        `Voicebox API returned status code ${response.status}(${response.statusText})`
      );
    }

    return toCamelCaseKeys(response.data) as Array<SpeakerListData>;
  } catch (error) {
    throw new Error(`Failed to fetch speaker: ${error}`);
  }
};

export const getSpeaker = async (
  speakerUUID: string,
  dataFormat: "base64" | "url" = "base64",
  version?: string | null
): Promise<Speaker | null> => {
  if (!rpc) {
    throw new Error(
      "Voicebox API is not connected. Please call connect() first."
    );
  }

  try {
    const response = await rpc.get(`/speaker_info`, {
      params: {
        speaker_uuid: speakerUUID,
        resource_format: dataFormat,
        core_version: version,
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Voicebox API returned status code ${response.status}(${response.statusText})`
      );
    }
    const data = toCamelCaseKeys(response.data) as Speaker;
    if (dataFormat === "url") {
      const baseUrl = rpc.defaults.baseURL as string;
      data.styleInfos.map((style) => {
        style.icon = style.icon.replace(/^(http|https):\/\/[^\/]+/, baseUrl);
        style.voiceSamples = style.voiceSamples.map((sample: string) => {
          return sample.replace(/^(http|https):\/\/[^\/]+/, baseUrl);
        });
        style.portrait = style.portrait
          ? style.portrait.replace(/^(http|https):\/\/[^\/]+/, baseUrl)
          : undefined;
      });
      data.portrait = data.portrait.replace(
        /^(http|https):\/\/[^\/]+/,
        baseUrl
      );
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to fetch speaker: ${error}`);
  }
};
