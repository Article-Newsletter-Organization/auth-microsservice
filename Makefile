NETWORK_NAME = article_newsletter_project_net

.PHONY: docker-dev-network docker-dev-start

## Check if a microservice network exists, if not it will create one
docker-dev-network:
	@if [ -z "$$(docker network ls --filter name=^$(NETWORK_NAME)$$ -q)" ]; then \
		echo ">>> Creating network $(NETWORK_NAME)"; \
		docker network create $(NETWORK_NAME); \
	else \
		echo ">>> Network $(NETWORK_NAME) already exists"; \
	fi

## Start development environment
docker-dev-start: docker-dev-network
	@echo ">>> Starting Postgres and Redis..."
	docker compose --env-file .env -f docker/docker-compose.yml up -d auth_service_postgres auth_service_redis

	@echo ">>> Waiting for Postgres to be ready..."
	@until docker exec auth_service_postgres pg_isready -U $$POSTGRES_USER >/dev/null 2>&1; do \
		echo "   Postgres not ready yet..."; \
		sleep 2; \
	done
	@echo ">>> Postgres is ready!"

	@echo ">>> Running Prisma migrations..."
	docker compose --env-file .env -f docker/docker-compose.yml run --rm auth_service_prisma_migration

	@echo ">>> Starting Auth API..."
	docker compose --env-file .env -f docker/docker-compose.yml up -d auth_service_api