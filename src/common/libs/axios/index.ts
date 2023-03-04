import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import logger from '../logger';

export const get = async <T>(
  url: string,
  requestConfig: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response = await axios.get<T>(url, requestConfig);
    return response.data;
  } catch (error) {
    const message: string = (error as AxiosError).message || '';
    logger.error(message);
    throw new Error(message);
  }
};

export const retryGet = async <T>(
  url: string,
  requestConfig: AxiosRequestConfig = {},
  { time = 0, max = 4 }: { time: number; max: number } = { time: 0, max: 4 }
): Promise<T> => {
  try {
    return await get<T>(url, requestConfig);
  } catch (error) {
    const message: string = (error as AxiosError).message;
    logger.error(message);
    if (time <= max) {
      return await retryGet<T>(url, requestConfig, { time: time + 1, max });
    } else {
      throw new Error(message);
    }
  }
};
