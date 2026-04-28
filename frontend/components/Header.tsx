"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import styles from "./Header.module.css";

interface HeaderProps {
  whatsappReceiver: string;
}

export function Header({ whatsappReceiver }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <header className={`shell ${styles.nav}`}>
        <a href="/" className={styles.logo} aria-label="Gal Atelier OS - Início">
          <img src="/brand/logo-gal-atelier.svg" alt="Logo Gal Atelier" />
          <span>Gal Atelier</span>
        </a>

        <div className={styles.navLinks}>
          <a
            href="#quote"
            className="button primary"
            style={{ minHeight: "40px", padding: "0.5rem 1.5rem", fontSize: "0.85rem" }}
          >
            Orçamento
          </a>

          <button
            className="themeToggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
            title={theme === "dark" ? "Modo claro" : "Modo escuro"}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

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
        <div className={styles.drawer}>
          <div className={styles.drawerOverlay} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div className={styles.drawerContent} role="dialog" aria-label="Menu de navegação">
<div className={styles.drawerClose}>
                <button onClick={() => setDrawerOpen(false)} aria-label="Fechar menu">
                  ✕
                </button>
              </div>

            <a href="/" className="logo" style={{ marginBottom: "1rem" }}>
              <img src="/brand/logo-gal-atelier.svg" alt="Logo Gal Atelier" style={{ width: "36px", height: "36px" }} />
              <span style={{ fontWeight: 900 }}>Gal Atelier</span>
            </a>

            <nav aria-label="Menu mobile">
              <a href="#quote" onClick={() => setDrawerOpen(false)}>📝 Orçamento</a>
              <a href="#catalog" onClick={() => setDrawerOpen(false)}>📦 Catálogo</a>
              <a href="#crm" onClick={() => setDrawerOpen(false)}>👥 CRM</a>
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