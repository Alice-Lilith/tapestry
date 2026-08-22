import "./Background.css";

export const BG_STYLES = ["linen", "grid", "citrus"] as const;
export type BgStyle = (typeof BG_STYLES)[number];

export const BG_LABELS: Record<BgStyle, string> = {
  linen: "Linen",
  grid: "Grid",
  citrus: "Citrus",
};

interface Props {
  style: BgStyle;
}

export function Background({ style }: Props) {
  return (
    <div className="bg-root" aria-hidden>
      {style === "linen" && <div className="bg-linen" />}
      {style === "grid" && <div className="bg-grid" />}
      {style === "citrus" && (
        <div className="bg-citrus">
          <div className="bg-citrus-orb bg-citrus-orb--a" />
          <div className="bg-citrus-orb bg-citrus-orb--b" />
          <div className="bg-citrus-orb bg-citrus-orb--c" />
        </div>
      )}
    </div>
  );
}
