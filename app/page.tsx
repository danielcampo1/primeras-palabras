import { words } from "./words";
import type { CSSProperties } from "react";

type WordCardProps = {
  emoji: string;
  es: string;
  en: string;
};

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      {words.map((word) => (
        <WordCard key={word.id} emoji={word.emoji} es={word.es} en={word.en} />
      ))}
    </main>
  );
}

const visuallyHidden: CSSProperties = {
  position: "absolute", // take it out of the layout so it doesn't take up space
  width: "1px", // shrink it to almost nothing…
  height: "1px",
  overflow: "hidden", // …and clip anything that spills out
  clip: "rect(0 0 0 0)", // older way to clip it to zero
  whiteSpace: "nowrap", // stop the text wrapping into a tall 1px column
  margin: "-1px", // pull it fully out of view
  padding: 0,
  border: 0,
};

function WordCard({ emoji, es, en }: WordCardProps) {
  return (
    <button
      style={{
        padding: "2rem 3rem",
        border: "4px solid #333",
        borderRadius: "24px",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "8rem", display: "block" }} aria-hidden="true">
        {emoji}
      </span>
      <span style={{ fontSize: "3rem", display: "block" }} lang="es">
        {es}
      </span>
      <span style={visuallyHidden}>,</span>
      <span style={{ fontSize: "3rem", display: "block" }}>{en}</span>
    </button>
  );
}
