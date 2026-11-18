export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          padding: "2rem 3rem",
          border: "4px solid #333",
          borderRadius: "24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "8rem" }}>🐕</div>
        <p style={{ fontSize: "3rem", margin: 0 }}>Perro</p>
        <p style={{ fontSize: "3rem", margin: 0 }}>Dog</p>
      </div>
    </main>
  );
}
