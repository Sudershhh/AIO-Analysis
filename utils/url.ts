export function normalizeURL(url: string) {
  if (!url) {
    return url;
  }
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }
  if (!/^https?:\/\/www\./i.test(url)) {
    url = url.replace(/^https?:\/\//i, "https://www.");
  }
  if (!url.endsWith("/robots.txt")) {
    url = `${url.replace(/\/+$/, "")}/robots.txt`;
  }
  return url;
}
