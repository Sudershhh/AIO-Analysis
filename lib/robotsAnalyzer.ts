// app/lib/robotsAnalyzer.ts
export function analyzeRobotsTxt(robotsTxt: string) {
  const lines = robotsTxt.split("\n");
  const directives: { allow: string[]; disallow: string[] } = {
    allow: [],
    disallow: [],
  };

  lines.forEach((line) => {
    if (line.startsWith("#") || line.trim() === "") return;

    const [directive, path] = line.split(" ");
    if (directive && path) {
      if (directive.toLowerCase() === "allow") {
        directives.allow.push(path);
      } else if (directive.toLowerCase() === "disallow") {
        directives.disallow.push(path);
      }
    }
  });
  console.log(directives);
  const recommendations = generateRecommendations(directives);
  return { directives, recommendations };
}

function generateRecommendations(directives: {
  allow: string[];
  disallow: string[];
}) {
  const recommendations = [];

  if (directives.disallow.length > 0) {
    recommendations.push(
      "Consider reviewing disallowed paths: " + directives.disallow.join(", ")
    );
  }

  if (directives.allow.length > 0) {
    recommendations.push(
      "Ensure critical pages are allowed for crawlers: " +
        directives.allow.join(", ")
    );
  }

  recommendations.push(
    "Regularly update your robots.txt to reflect site changes."
  );
  return recommendations;
}
