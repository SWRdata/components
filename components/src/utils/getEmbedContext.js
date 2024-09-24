/**
 * Get current url params or - if on production - params from embed url.
 * @param {object} embed root dom element
 * @returns {object} url params
 */

const getEmbedContext = (target) => {
  let url;
  if (
    import.meta.env.DEV ||
    window.location.origin === 'https://d.swr.de' ||
    window.location.origin === 'https://static.datenhub.net' ||
    window.location.href.includes('apidata.googleusercontent.com') ||
    window.location.href.includes('storage.googleapis.com')
  ) {
    url = window.location.href;
  } else {
    const parent = target.parentNode || target.parentNode.parentNode;
    url = parent.dataset.url;
  }
  const data = {};
  for (const [key, value] of new URL(url).searchParams) {
    data[key] = value;
  }
  return data;
};

export default getEmbedContext;
