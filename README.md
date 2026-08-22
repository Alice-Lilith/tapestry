# tapestry

Shared React components, theme tokens, and Tauri helpers for my desktop apps.

## Use from an app

```jsonc
// apps/desktop/package.json
"dependencies": { "@alice-lilith/tapestry": "link:../../../tapestry" }
```

```ts
// vite.config.ts — keep a single copy of React across the symlink
resolve: {
  dedupe: ["react", "react-dom", "react-router"];
}
```

```ts
import "@alice-lilith/tapestry/styles.css"; // before the app's own index.css
import { AppHeader, Background, useTheme, useBgStyle } from "@alice-lilith/tapestry";
import { createSettingsStore, resolveServerUrl } from "@alice-lilith/tapestry/tauri";
```

See [CLAUDE.md](CLAUDE.md) for what lives here and why.
