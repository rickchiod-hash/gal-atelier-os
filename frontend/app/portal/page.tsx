"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface ClientOrder {
  id: string;
  serviceType: string;
  status: string;
  price: number;
  createdAt: string;
  description: string;
}

export default function PortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<ClientOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(data => {
        setUser(data);
        return fetch("/api/orders?clientId=" + data.id, {
          headers: { Authorization: `Bearer ${token}` }
        });
      })
      .then(res => res.json())
      .then(data => setOrders(data || []))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="portal-loading">
        <p>Carregando...</p>
      </div>
    );
  }

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      QUOTED: "Orçamento",
      APPROVED: "Aprovado",
      IN_PRODUCTION: "Em Produção",
      COMPLETED: "Concluído",
      CANCELLED: "Cancelado"
    };
    return map[status] || status;
  };

  return (
    <div className="portal-page">
      <header className="portal-header">
        <div className="portal-brand">
          <h1>Gal Atelier</h1>
          <span>Portal do Cliente</span>
        </div>
        <div className="portal-user">
          <span>{user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </header>

      <main className="portal-main">
        <section className="portal-welcome">
          <h2>Bem-vinda, {user?.name?.split(" ")[0]}!</h2>
          <p>Aqui você acompanha seus pedidos e solicita novos serviços.</p>
        </section>

        <section className="portal-orders">
          <h3>Seus Pedidos</h3>
          {orders.length === 0 ? (
            <div className="portal-empty">
              <p>Nenhum pedido ainda.</p>
              <a href="/#quote" className="btn-primary">
                Solicitar Orçamento
              </a>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-service">{order.serviceType}</span>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="order-body">
                    <p className="order-desc">{order.description}</p>
                    <span className="order-price">R$ {order.price.toFixed(2)}</span>
                  </div>
                  <div className="order-footer">
                    <span className="order-date">{order.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="portal-actions">
          <a href="/#quote" className="btn-primary">
            Novo Orçamento
          </a>
          <a href="#profile" className="btn-secondary">
            Editar Perfil
          </a>
        </section>
      </main>
    </div>
  );
}