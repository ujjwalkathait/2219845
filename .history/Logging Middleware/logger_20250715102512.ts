// logger.ts

type Stack = "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type Package =
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

interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

export async function log(stack: Stack, level: Level, pkg: Package, message: string): Promise<void> {
  const payload: LogPayload = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Logging failed:", result);
    } else {
      console.info("Log sent:", result);
    }
  } catch (error) {
    console.error("Error sending log:", error);
  }
}
