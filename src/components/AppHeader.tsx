import { Link } from "react-router";
import type { ReactNode } from "react";
import { BG_LABELS, type BgStyle } from "./Background";
import type { Theme } from "../hooks/useTheme";
import "./AppHeader.css";

const SETTINGS_ICON = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
    <path d="M6.94.75a1.06 1.06 0 0 0-1.06.97l-.1.9a5.23 5.23 0 0 0-1.14.66l-.86-.35a1.06 1.06 0 0 0-1.3.47L1.38 4.5a1.06 1.06 0 0 0 .23 1.33l.7.58a5.3 5.3 0 0 0 0 1.18l-.7.58a1.06 1.06 0 0 0-.23 1.33l1.06 1.84c.27.47.83.66 1.3.47l.86-.35c.35.25.73.47 1.14.66l.1.9c.08.57.57.98 1.06.98h2.12c.5 0 .98-.41 1.06-.98l.1-.9c.41-.19.79-.41 1.14-.66l.86.35c.47.19 1.03 0 1.3-.47l1.06-1.84a1.06 1.06 0 0 0-.23-1.33l-.7-.58c.03-.2.04-.39.04-.59s-.01-.4-.04-.59l.7-.58a1.06 1.06 0 0 0 .23-1.33L13.1 3.5a1.06 1.06 0 0 0-1.3-.47l-.86.35a5.23 5.23 0 0 0-1.14-.66l-.1-.9A1.06 1.06 0 0 0 8.56.75H6.94Zm-.44 1.5h3l.12 1.04.37.16c.37.16.71.37 1.02.61l.3.24.99-.4.75 1.3-.8.66.05.38c.04.25.06.5.06.76s-.02.5-.06.76l-.05.38.8.66-.75 1.3-.99-.4-.3.24c-.31.24-.65.45-1.02.6l-.37.17-.12 1.04h-3L6.38 9.7l-.37-.16a3.73 3.73 0 0 1-1.02-.61l-.3-.24-.99.4-.75-1.3.8-.66-.05-.38A3.75 3.75 0 0 1 3.64 6c0-.26.02-.51.06-.76l.05-.38-.8-.66.75-1.3.99.4.3-.24c.31-.24.65-.45 1.02-.6l.37-.17.12-1.04Z" />
  </svg>
);

export interface AppHeaderProps {
  /** Emoji or element shown before the app name. */
  icon: ReactNode;
  /** App name shown in the logo link. */
  title: string;
  theme: Theme;
  onToggleTheme: () => void;
  bgStyle: BgStyle;
  onCycleBg: () => void;
  /** Route for the settings button; pass `null` to hide it. */
  settingsTo?: string | null;
  /** App-specific actions, rendered before the built-in controls. */
  children?: ReactNode;
}

/**
 * The header shell every app shares: logo link on the left, app-specific actions plus the
 * background / theme / settings controls on the right. Decide in the app whether to render
 * it at all (e.g. hide it on a full-screen viewer route).
 */
export function AppHeader({
  icon,
  title,
  theme,
  onToggleTheme,
  bgStyle,
  onCycleBg,
  settingsTo = "/settings",
  children,
}: AppHeaderProps) {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <span className="header-logo-icon">{icon}</span>
        <span className="header-logo-text">{title}</span>
      </Link>
      <div className="header-actions">
        {children}
        <button className="header-bg-btn" onClick={onCycleBg} title="Cycle background style">
          <span className="header-bg-icon">✦</span>
          <span className="header-bg-label">{BG_LABELS[bgStyle]}</span>
        </button>
        <button
          className="header-theme-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀" : "☽"}
        </button>
        {settingsTo !== null && (
          <Link
            to={settingsTo}
            className="header-settings-btn"
            aria-label="Settings"
            title="Settings"
          >
            {SETTINGS_ICON}
          </Link>
        )}
      </div>
    </header>
  );
}
