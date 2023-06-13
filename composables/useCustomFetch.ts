import type { UseFetchOptions } from "nuxt/app";
import { defu } from "defu";

export async function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const { getAccessToken } = useAuthSession();

  const accessToken = await getAccessToken();

  const defaults: UseFetchOptions<T> = {
    //  baseURL: config.baseUrl ?? "https://api.nuxtjs.dev",
    // cache request
    key: url,

    // set user token if connected
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},

    onResponse(_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },

    onResponseError(_ctx) {
      // throw new myBusinessError()
    },
  };

  // for nice deep defaults, please use unjs/defu
  const params = defu(options, defaults);

  return useFetch(url, params);
}
