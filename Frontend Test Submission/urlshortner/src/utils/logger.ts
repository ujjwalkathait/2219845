export type Stack = "frontend";
export type Level = "debug" | "info" | "warn" | "error" | "fatal";
export type Package =
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

export interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

export async function logEvent(
  token: string,
  stack: Stack,
  level: Level,
  pkg: Package,
  message: string
): Promise<void> {
  const payload: LogPayload = {
    stack,
    level,
    package: pkg,
    message,
  };

  console.log("Sending log with payload:", payload);
  console.log("Using token:", token);

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Failed to send log:", result);
    } else {
      console.log("Log sent:", result);
    }
  } catch (error: any) {
    console.error("Logging error:", error);
  }
}
