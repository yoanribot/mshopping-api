export const getStoreAndDomain = (url) => {
  const hostname = new URL(url).hostname;
  const values = hostname.split(".");

  return {
    store: values[1],
    domain: values[2],
  };
};
