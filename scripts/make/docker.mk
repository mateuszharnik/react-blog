######################################
############### DOCKER ###############
######################################

.ONESHELL:
docker@up: # Start docker compose
docker@up:
	@cd ./docker
	@docker-compose --env-file ../.env up

.ONESHELL:
docker@up-background: # Start docker compose in background
docker@up-background:
	@cd ./docker
	@docker-compose --env-file ../.env up -d

.ONESHELL:
docker@down: # Stop docker compose
docker@down:
	@cd ./docker
	@docker-compose --env-file ../.env down
