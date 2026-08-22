export type PingResult = { ok: true } | { ok: false; reason: string };

/** Probe a local server; `path` is whichever GET route the app treats as its health check. */
export async function pingServer(port: number, path = "/api/v1/health"): Promise<PingResult> {
  try {
    const res = await fetch(`http://localhost:${port}${path}`, {
      signal: AbortSignal.timeout(2000),
    });
    return res.ok ? { ok: true } : { ok: false, reason: `HTTP ${res.status}` };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    // Trim noisy browser-internal prefixes
    return { ok: false, reason: msg.replace(/^Failed to fetch$/, "Connection refused") };
  }
}

/** Ask the Tauri shell to restart the sidecar on `port`. Expects a `restart_server` command. */
export async function restartServer(port: number): Promise<void> {
  const { invoke } = await import("@tauri-apps/api/core");
  await invoke("restart_server", { port });
}

export async function reloadServerConfig(
  serverUrl: string,
  settings: { logLevel: string },
): Promise<void> {
  await fetch(`${serverUrl}/api/v1/config/reload`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(settings),
    signal: AbortSignal.timeout(2000),
  });
}

/**
 * Inside Tauri, ask Rust (`get_server_url`) where the sidecar is listening; in a plain browser
 * (`make dev-web`) fall back to the given URL.
 */
export async function resolveServerUrl(fallback: string): Promise<string> {
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    return (await invoke<string>("get_server_url")) ?? fallback;
  } catch {
    return fallback;
  }
}

export interface WaitOptions {
  attempts?: number;
  intervalMs?: number;
  /** Bail out early (e.g. when the calling component unmounts). */
  shouldStop?: () => boolean;
}

/** Poll `ping` until it resolves true. Returns false on give-up or stop. */
export async function waitForServer(
  ping: () => Promise<boolean>,
  { attempts = 20, intervalMs = 500, shouldStop = () => false }: WaitOptions = {},
): Promise<boolean> {
  for (let i = 0; i < attempts; i++) {
    if (shouldStop()) return false;
    if (await ping()) return true;
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return false;
}
