import { rpc } from "./rpc";
import { SpeakerListData } from "./types";
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
