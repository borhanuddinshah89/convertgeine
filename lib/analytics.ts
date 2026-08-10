type EventParameters = Record<string, string | number | boolean>;

export function trackToolEvent(
  action: "tool_start" | "tool_complete" | "tool_error",
  tool: string,
  parameters: EventParameters = {}
) {
  if (typeof window === "undefined") return;

  const gtag = (window as typeof window & {
    gtag?: (command: "event", eventName: string, params: EventParameters) => void;
  }).gtag;

  gtag?.("event", action, {
    tool_name: tool,
    ...parameters,
  });
}
