import { parse, stringify } from "yaml";

export type LogLevel = "error" | "warn" | "info" | "debug";

/** The settings every app has. Apps extend this with their own fields. */
export interface BaseSettings {
  serverPort: number;
  logLevel: LogLevel;
  keepServerRunning: boolean;
}

export interface SettingsStore<T> {
  defaults: T;
  load(): Promise<T>;
  save(settings: T): Promise<void>;
}

/**
 * A YAML settings file in the Tauri app-config dir, with a localStorage fallback for the
 * non-Tauri dev environment. Missing keys are filled from `defaults`.
 */
export function createSettingsStore<T extends BaseSettings>(
  defaults: T,
  { fileName = "settings.yaml", storageKey = "appSettings" } = {},
): SettingsStore<T> {
  async function settingsPath(): Promise<string> {
    const { join, appConfigDir } = await import("@tauri-apps/api/path");
    return join(await appConfigDir(), fileName);
  }

  async function tauriLoad(): Promise<T> {
    const { readTextFile } = await import("@tauri-apps/plugin-fs");
    return { ...defaults, ...(parse(await readTextFile(await settingsPath())) as Partial<T>) };
  }

  async function tauriSave(s: T): Promise<void> {
    const { writeTextFile, mkdir } = await import("@tauri-apps/plugin-fs");
    const { appConfigDir } = await import("@tauri-apps/api/path");
    await mkdir(await appConfigDir(), { recursive: true });
    await writeTextFile(await settingsPath(), stringify(s));
  }

  return {
    defaults,
    async load() {
      try {
        return await tauriLoad();
      } catch {
        try {
          const raw = localStorage.getItem(storageKey);
          if (raw) return { ...defaults, ...(JSON.parse(raw) as Partial<T>) };
        } catch {
          /* ignore */
        }
        return { ...defaults };
      }
    },
    async save(s) {
      try {
        await tauriSave(s);
      } catch {
        localStorage.setItem(storageKey, JSON.stringify(s));
      }
    },
  };
}
