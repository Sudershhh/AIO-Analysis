import { normalizeURL } from "./url";

export const downloadTextFile = (improvedRobotsTxt: string, url: string) => {
  const element = document.createElement("a");
  const file = new Blob([improvedRobotsTxt || ""], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = normalizeURL(url);
  document.body.appendChild(element);
  element.click();
};
