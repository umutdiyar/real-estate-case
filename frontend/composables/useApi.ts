export const useApi = () => {
  const config = useRuntimeConfig();

  const request = async <T>(
    url: string,
    options?: Parameters<typeof $fetch<T>>[1],
  ) => {
    return await $fetch<T>(`${config.public.apiBase}${url}`, {
      ...options,
    });
  };

  return { request };
};
