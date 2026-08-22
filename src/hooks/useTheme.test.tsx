import { act, renderHook } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    window.matchMedia = (() => ({ matches: false })) as unknown as typeof window.matchMedia;
  });

  it("defaults to light, toggles, and persists", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current[0]).toBe("light");
    act(() => result.current[1]());
    expect(result.current[0]).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
