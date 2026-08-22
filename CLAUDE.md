# Tapestry

Shared frontend library for the alice-lilith desktop apps (`../recipes`, `../photos`,
`../manga-reader`). Ships TypeScript source — no build step; consumers' Vite compiles it.

## Contents

- `src/index.ts` (`@alice-lilith/tapestry`) — `Background`, `AppHeader`, `useTheme`, `useBgStyle`
- `src/tauri/` (`@alice-lilith/tapestry/tauri`) — sidecar helpers (`pingServer`, `resolveServerUrl`,
  `waitForServer`, `restartServer`, `reloadServerConfig`) and `createSettingsStore<T>` (YAML in the
  Tauri config dir, localStorage fallback)
- `src/styles/index.css` (`@alice-lilith/tapestry/styles.css`) — reset, element defaults, default palette
  tokens. Apps import it first, then override `:root` / `[data-theme="dark"]` vars in their own CSS.

## Key Decisions

- **Source-only package, consumed by path.** Apps depend on it with
  `"@alice-lilith/tapestry": "link:../../../tapestry"` so edits here show up live under `make dev`. React,
  react-router, and the Tauri APIs are `peerDependencies`; consumers should `resolve.dedupe` them in
  Vite so the symlink never pulls a second React.
- **Shell, not app.** `AppHeader` takes the logo and app-specific actions as props/children and owns
  only the controls every app has (background, theme, settings). Route-dependent behaviour (hide on a
  viewer page, which actions to show) stays in the app.
- **Promote on the third copy.** A component moves here once it exists in at least two apps with the
  same shape. Tiles (RecipeCard / PhotoTile / MangaTile) are still app-specific on purpose.
- **Same tooling as the apps.** oxlint, oxfmt, Vitest + Testing Library, TS 6 strict. `make` is the
  entry point; don't call pnpm directly.

## Dev Commands

```bash
make            # list targets
make install    # pnpm install
make check      # typecheck + lint + test
make test-watch
make format
```

## Maintaining This File

Keep it short. Update Contents when an export is added or removed.
