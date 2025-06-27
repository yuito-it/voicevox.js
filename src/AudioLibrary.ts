import { rpc } from "./rpc";
import {
  Speaker,
  SpeakerInfoResponce,
  SpeakerListData,
  SpeakerStyle,
} from "./types";
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
): Promise<Speaker> => {
  if (!rpc) {
    throw new Error(
      "Voicebox API is not connected. Please call connect() first."
    );
  }

  try {
    const responseInfo = await rpc.get(`/speaker_info`, {
      params: {
        speaker_uuid: speakerUUID,
        resource_format: dataFormat,
        core_version: version,
      },
    });

    const responseList = await rpc.get(`/speakers`, {
      params: {
        core_version: version,
      },
    });

    if (responseInfo.status !== 200 || responseList.status !== 200) {
      throw new Error(
        `Voicebox API returned status code ${responseInfo.status}(${responseInfo.statusText})`
      );
    }

    const dataInfo = toCamelCaseKeys(responseInfo.data) as SpeakerInfoResponce;
    if (dataFormat === "url") {
      const baseUrl = rpc.defaults.baseURL as string;
      dataInfo.styleInfos.map((style) => {
        style.icon = style.icon.replace(/^(http|https):\/\/[^\/]+/, baseUrl);
        style.voiceSamples = style.voiceSamples.map((sample: string) => {
          return sample.replace(/^(http|https):\/\/[^\/]+/, baseUrl);
        });
        style.portrait = style.portrait
          ? style.portrait.replace(/^(http|https):\/\/[^\/]+/, baseUrl)
          : undefined;
      });
      dataInfo.portrait = dataInfo.portrait.replace(
        /^(http|https):\/\/[^\/]+/,
        baseUrl
      );
    }

    const dataList: SpeakerListData | undefined = (
      toCamelCaseKeys(responseList.data) as SpeakerListData[]
    ).find((speaker) => speaker.speakerUuid === speakerUUID);

    if (!dataInfo) {
      throw new Error(`Speaker style is missing`);
    }

    if (!dataList) {
      throw new Error(`Speaker with UUID ${speakerUUID} not found`);
    }

    const styles: Array<SpeakerStyle> = [];

    const dataListStyles = dataList.styles.sort((a, b) => a.id - b.id);
    const dataInfoStyles = dataInfo.styleInfos.sort((a, b) => a.id - b.id);

    for (
      let i = 0;
      i < dataInfoStyles.length && i < dataListStyles.length;
      i++
    ) {
      if (!dataListStyles[i] || !dataInfoStyles[i]) {
        throw new Error(`Speaker style is missing`);
      }
      styles.push({
        id: dataInfoStyles[i]!.id,
        type: dataListStyles[i]!.type,
        portrait: dataInfoStyles[i]!.portrait || "",
        name: dataListStyles[i]!.name,
        icon: dataInfoStyles[i]!.icon,
        voiceSamples: dataInfoStyles[i]!.voiceSamples,
      });
    }

    const returnData: Speaker = {
      name: dataList.name,
      speakerUuid: dataList.speakerUuid,
      policy: dataInfo.policy,
      portrait: dataInfo.portrait,
      styles: styles,
      version: dataList.version,
      supportedFeatures: dataList.supportedFeatures,
    };

    return returnData;
  } catch (error) {
    throw new Error(`Failed to fetch speaker: ${error}`);
  }
};
