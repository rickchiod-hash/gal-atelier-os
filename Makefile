.PHONY: help backend-build backend-test frontend-build frontend-test docker-up docker-down clean

help:
	@echo "Gal Atelier OS - Makefile Commands"
	@echo "  backend-build    - Build backend with Maven"
	@echo "  backend-test     - Run backend tests"
	@echo "  frontend-build   - Build frontend with npm"
	@echo "  frontend-test    - Run frontend tests"
	@echo "  docker-up        - Start all services with Docker Compose"
	@echo "  docker-down      - Stop all Docker services"
	@echo "  clean            - Clean build artifacts"

backend-build:
	cd backend && mvn clean install -DskipTests

backend-test:
	cd backend && mvn test

frontend-build:
	cd frontend && npm install && npm run build

frontend-test:
	cd frontend && npm test

docker-up:
	docker compose up -d

docker-down:
	docker compose down

clean:
	cd backend && mvn clean
	cd frontend && rm -rf node_modules .next
	rm -f *.log *.json