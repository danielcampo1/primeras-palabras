export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <WordCard emoji="🐕" es="dog" en="Dog" />
      <WordCard emoji="🐎" es="Caballo" en="horse" />
    </main>
  );
}

type WordCardProps = {
  emoji: string;
  es: string;
  en: string;
};

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
