import axios, { type AxiosInstance } from "axios";

export let rpc: AxiosInstance | undefined;

export const connect = async (
  baseURL: string,
  headers?: Record<string, string>
): Promise<void> => {
  if (baseURL === undefined || baseURL === "") {
    throw new Error("Base URL for Voicebox API is not defined.");
  }
  try {
    if (!rpc) {
      rpc = axios.create({
        baseURL,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
    }
  } catch (error) {
    throw new Error(`Failed to connect to Voicebox API: ${error}`);
  }
};

export const disconnect = async (): Promise<void> => {
  try {
    if (rpc) {
      rpc = undefined;
    }
  } catch (error) {
    throw new Error(`Failed to disconnect from Voicebox API: ${error}`);
  }
};
