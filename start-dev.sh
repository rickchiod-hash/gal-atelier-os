#!/bin/bash
# Gal Atelier OS - Quick Start Script
# Usage: ./start-dev.sh

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "======================================"
echo "  Gal Atelier OS - Quick Start"
echo "======================================"

cd "$PROJECT_ROOT"

# Start services
echo "[1/4] Validando docker-compose.yml..."
docker compose config > /dev/null

echo "[2/4] Iniciando PostgreSQL..."
docker compose up -d postgres
echo "    -> Aguardando PostgreSQL ficar saudável..."
sleep 5

echo "[3/4] Iniciando backend..."
docker compose up -d backend
echo "    -> Aguardando backend ficar saudável..."
for i in {1..30}; do
    if curl -sf http://localhost:8080/api/health > /dev/null 2>&1; then
        echo "    -> Backend saudável!"
        break
    fi
    echo "    -> Tentativa $i/30..."
    sleep 2
done

echo "[4/4] Iniciando frontend..."
docker compose up -d frontend

echo ""
echo "======================================"
echo "  Serviços iniciados:"
echo "  - Frontend: http://localhost:3000"
echo "  - Backend:  http://localhost:8080"
echo "  - API Health: http://localhost:8080/api/health"
echo "  - Swagger:  http://localhost:8080/swagger-ui.html"
echo "======================================"
echo ""
echo "Para parar: docker compose down"
echo "Para ver logs: docker compose logs -f"