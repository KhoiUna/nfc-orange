export const swrFetcher = (url: string) => fetch(url).then((r) => r.json());
