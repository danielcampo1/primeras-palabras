export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <WordCard animal="🐕" es="5" en="Dog" />
      <WordCard animal="🐎" es="Caballo" en="hourse" />
    </main>
  );
}

function WordCard({ animal, es, en }: WordCardProps) {
  return (
    <div
      style={{
        padding: "2rem 3rem",
        border: "4px solid #333",
        borderRadius: "24px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "8rem" }}>{animal}</div>
      <p style={{ fontSize: "3rem", margin: 0 }}>{es}</p>
      <p style={{ fontSize: "3rem", margin: 0 }}>{en}</p>
    </div>
  );
}
type WordCardProps = {
  animal: string;
  es: string;
  en: string;
};
