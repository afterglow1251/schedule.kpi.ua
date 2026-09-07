import { BASE_URL } from '../common/constants/config';

type FetchOptions = Omit<RequestInit, 'headers'>;

const fetchWrapper = async <T = unknown>(requestUrl: string, options: FetchOptions = {}): Promise<T> => {
  const url = BASE_URL + requestUrl;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} in request to ${url}`);
  }
  return await response.json();
};

const Http = {
  get: <T = unknown>(url: string, options: FetchOptions = {}) => fetchWrapper<T>(url, { ...options, method: 'GET' }),
};

export default Http;
