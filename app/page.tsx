import { words } from "./words";

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

function WordCard({ emoji, es, en }: WordCardProps) {
  return (
    <div
      style={{
        padding: "2rem 3rem",
        border: "4px solid #333",
        borderRadius: "24px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "8rem" }}>{emoji}</div>
      <p style={{ fontSize: "3rem", margin: 0 }}>{es}</p>
      <p style={{ fontSize: "3rem", margin: 0 }}>{en}</p>
    </div>
  );
}
