import { track as vercelTrack } from "@vercel/analytics";

const analyticsSent = new Set<string>();

export function track(
  name: string,
  properties: Record<string, any>,
  once = false
) {
  if (once) {
    const key = `${name}-${JSON.stringify(properties)}`;
    if (analyticsSent.has(key)) return;

    analyticsSent.add(key);
  }
  vercelTrack(name, properties);
}
