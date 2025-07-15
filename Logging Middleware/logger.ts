type Stack = "frontend";
type Level = "debug" | "info" | "warn" | "error" | "fatal";
type Package =
  | "api" | "component" | "hook" | "page" | "state" | "style"
  | "auth" | "config" | "middleware" | "utils";

interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

export async function log(
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
    message
  };

  try {
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log("Log result:", result);
  } catch (err) {
    console.error("Failed to send log:", err);
  }
}
