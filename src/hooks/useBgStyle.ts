import { useEffect, useState } from "react";
import { BG_STYLES, type BgStyle } from "../components/Background";

const KEY = "bgStyle";

function getInitialBg(): BgStyle {
  const stored = localStorage.getItem(KEY);
  if (stored && (BG_STYLES as readonly string[]).includes(stored)) return stored as BgStyle;
  return "linen";
}

/** Background style, persisted to localStorage. The callback cycles to the next style. */
export function useBgStyle(): [BgStyle, () => void] {
  const [bgStyle, setBgStyle] = useState<BgStyle>(getInitialBg);

  useEffect(() => {
    localStorage.setItem(KEY, bgStyle);
  }, [bgStyle]);

  const cycle = () =>
    setBgStyle((current) => {
      const idx = BG_STYLES.indexOf(current);
      return BG_STYLES[(idx + 1) % BG_STYLES.length] ?? BG_STYLES[0];
    });
  return [bgStyle, cycle];
}
