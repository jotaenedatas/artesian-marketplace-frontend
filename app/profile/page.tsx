"use client";

export default function PerfilLoja() {
  return (
    <main style={{ padding: "20px", maxWidth: "960px", margin: "0 auto", fontFamily: "Inter, sans-serif", background: "#f8f9fb" }}>
      {/* Cabeçalho */}
      <section
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginBottom: "35px",
          background: "white",
          padding: "20px",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          transition: "transform .2s, box-shadow .2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
        }}
      >
        <img
          src="https://via.placeholder.com/150"
          alt="Logo da loja"
          style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "4px solid #2563eb" }}
        />
        <div>
          <h1 style={{ fontSize: "30px", fontWeight: "bold", color: "#1e3a8a" }}>Capybara Market</h1>
          <p style={{ color: "#444", marginTop: "6px" }}> Avaliação média: 0 ★ • 0 reviews • 2 produtos</p>
        </div>
      </section>

      {/* Sobre */}
      <section style={{ marginBottom: "30px", background: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#2563eb", marginBottom: "10px" }}>Sobre</h2>
        <p style={{ color: "#333", lineHeight: 1.7 }}>
          Capybara Market é uma loja artesanal focada em produtos feitos à mão. Trabalhamos com materiais naturais e priorizamos qualidade e autenticidade.
        </p>
      </section>

      {/* Produtos */}
      <section style={{ marginBottom: "30px", background: "white", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#2563eb", marginBottom: "15px" }}>Produtos</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                transition: "transform .2s, box-shadow .2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <img
                src={`https://via.placeholder.com/300?text=Produto+${i}`}
                alt={`Produto ${i}`}
                style={{ width: "100%", height: "160px", objectFit: "cover" }}
              />
              <div style={{ padding: "12px" }}>
                <h3 style={{ fontWeight: "600", marginBottom: "4px" }}>Produto {i}</h3>
                <p style={{ color: "#555", marginBottom: "8px", fontSize: "14px" }}>
                  Descrição curta do produto.
                </p>
                <strong style={{ fontSize: "18px", color: "#1e40af" }}>R$ 89,90</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
