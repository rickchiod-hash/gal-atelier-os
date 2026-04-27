"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";

interface HeaderProps {
  whatsappReceiver: string;
}

export function Header({ whatsappReceiver }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className="shell nav">
        <a href="/" className="logo" aria-label="Gal Atelier OS - Início">
          <img src="/brand/logo-gal-atelier.svg" alt="Logo Gal Atelier" />
          <span>Gal Atelier OS</span>
        </a>

        <nav className="navLinks" aria-label="Navegação principal">
          <a href="#overview">Dashboard</a>
          <a href="#quote">Orçamento</a>
          <a href="#crm">CRM</a>
          <a href="#catalog">Catálogo</a>
          <a href="#pipeline">Pipeline</a>
        </nav>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button
            className="themeToggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
            title={theme === "dark" ? "Modo claro" : "Modo escuro"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          <a
            href={`https://wa.me/${whatsappReceiver}`}
            className="button secondary"
            target="_blank"
            rel="noopener noreferrer"
            style={{ minHeight: "40px", padding: "0.5rem 1rem", fontSize: "0.85rem" }}
          >
            WhatsApp
          </a>

          <button
            className="mobileMenuBtn"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={drawerOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      {drawerOpen && (
        <div className="drawer">
          <div className="drawerOverlay" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div className="drawerContent" role="dialog" aria-label="Menu de navegação">
            <div className="drawerClose">
              <button onClick={() => setDrawerOpen(false)} aria-label="Fechar menu">
                ✕
              </button>
            </div>

            <a href="/" className="logo" style={{ marginBottom: "1rem" }}>
              <img src="/brand/logo-gal-atelier.svg" alt="Logo Gal Atelier" style={{ width: "36px", height: "36px" }} />
              <span style={{ fontWeight: 900 }}>Gal Atelier OS</span>
            </a>

            <nav aria-label="Menu mobile">
              <a href="#overview" onClick={() => setDrawerOpen(false)}>📊 Dashboard</a>
              <a href="#quote" onClick={() => setDrawerOpen(false)}>📝 Novo Orçamento</a>
              <a href="#crm" onClick={() => setDrawerOpen(false)}>👥 CRM</a>
              <a href="#catalog" onClick={() => setDrawerOpen(false)}>📦 Catálogo</a>
              <a href="#pipeline" onClick={() => setDrawerOpen(false)}>🔄 Pipeline</a>
            </nav>

            <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
              <button
                className="themeToggle"
                onClick={toggleTheme}
                style={{ width: "100%", borderRadius: "var(--radius-md)", height: "48px" }}
              >
                {theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Escuro"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}