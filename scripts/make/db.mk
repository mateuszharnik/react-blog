#############################################
############### SEED DATABASE ###############
#############################################

.ONESHELL:
db@seed: # Seed the database with example data for given environment
db@seed: check-env
	@make db@clean-$(ENV)
	@make migration@up-$(ENV)
	@cross-env APP_ENV=$(ENV) npx babel-node ./src/server/seeds/index.js

.ONESHELL:
db@seed-production: # Seed the database with example data in production environment
db@seed-production:
	@make db@clean-production
	@make migration@up-production
	@cross-env APP_ENV=production npx babel-node ./src/server/seeds/index.js

.ONESHELL:
db@seed-development: # Seed the database with example data in local environment
db@seed-development:
	@make db@clean-development
	@make migration@up-development
	@cross-env APP_ENV=development npx babel-node ./src/server/seeds/index.js

.ONESHELL:
db@seed-test: # Seed the database with example data in test environment
db@seed-test:
	@make db@clean-test
	@make migration@up-test
	@cross-env NODE_ENV=test APP_ENV=test npx babel-node ./src/server/seeds/index.js

.ONESHELL:
db@seed-e2e: # Seed the database with example data in e2e environment
db@seed-e2e:
	@make db@clean-e2e
	@make migration@up-e2e
	@cross-env APP_ENV=e2e npx babel-node ./src/server/seeds/index.js

.ONESHELL:
db@seed-staging: # Seed the database with example data in staging environment
db@seed-staging:
	@make db@clean-staging
	@make migration@up-staging
	@cross-env APP_ENV=staging npx babel-node ./src/server/seeds/index.js

.ONESHELL:
db@seed-testing: # Seed the database with example data in testing environment
db@seed-testing:
	@make db@clean-testing
	@make migration@up-testing
	@cross-env APP_ENV=testing npx babel-node ./src/server/seeds/index.js

##############################################
############### CLEAN DATABASE ###############
##############################################

.ONESHELL:
db@clean: # Remove data from database for given environment
db@clean: check-env
	@cross-env APP_ENV=$(ENV) npx babel-node ./src/server/seeds/clean.js

.ONESHELL:
db@clean-production: # Remove data from production database
db@clean-production:
	@cross-env APP_ENV=production npx babel-node ./src/server/seeds/clean.js

.ONESHELL:
db@clean-development: # Remove data from local database
db@clean-development:
	@cross-env APP_ENV=development npx babel-node ./src/server/seeds/clean.js

.ONESHELL:
db@clean-test: # Remove data from test database
db@clean-test:
	@cross-env NODE_ENV=test APP_ENV=test npx babel-node ./src/server/seeds/clean.js

.ONESHELL:
db@clean-e2e: # Remove data from e2e database
db@clean-e2e:
	@cross-env APP_ENV=e2e npx babel-node ./src/server/seeds/clean.js

.ONESHELL:
db@clean-staging: # Remove data from staging database
db@clean-staging:
	@cross-env APP_ENV=staging npx babel-node ./src/server/seeds/clean.js

.ONESHELL:
db@clean-testing: # Remove data from testing database
db@clean-testing:
	@cross-env APP_ENV=testing npx babel-node ./src/server/seeds/clean.js

####################################################
############### CREATE NEW MIGRATION ###############
####################################################

.ONESHELL:
migration@create: # Create new migration file
migration@create:
	@echo -e "This task will never end automatically so you should kill this task manually after creating a new migration file\n"
	@cross-env APP_ENV=development npx migrate-mongo create -f migrations.config.js $(NAME)

##############################################
############### RUN MIGRATIONS ###############
##############################################

.ONESHELL:
migration@up: # Run migrations for given environment
migration@up: check-env
	@cross-env APP_ENV=$(ENV) npx migrate-mongo up -f migrations.config.js

.ONESHELL:
migration@up-production: # Run migrations for production environment
migration@up-production:
	@cross-env APP_ENV=production npx migrate-mongo up -f migrations.config.js

.ONESHELL:
migration@up-development: # Run migrations for local environment
migration@up-development:
	@cross-env APP_ENV=development npx migrate-mongo up -f migrations.config.js

.ONESHELL:
migration@up-test: # Run migrations for test environment
migration@up-test:
	@cross-env APP_ENV=test npx migrate-mongo up -f migrations.config.js

.ONESHELL:
migration@up-e2e: # Run migrations for e2e environment
migration@up-e2e:
	@cross-env APP_ENV=e2e npx migrate-mongo up -f migrations.config.js

.ONESHELL:
migration@up-staging: # Run migrations for staging environment
migration@up-staging:
	@cross-env APP_ENV=staging npx migrate-mongo up -f migrations.config.js

.ONESHELL:
migration@up-testing: # Run migrations for testing environment
migration@up-testing:
	@cross-env APP_ENV=testing npx migrate-mongo up -f migrations.config.js

################################################
############### REVERT MIGRATION ###############
################################################

.ONESHELL:
migration@down: # Revert migration for given environment
migration@down: check-env
	@cross-env APP_ENV=$(ENV) npx migrate-mongo down -f migrations.config.js

.ONESHELL:
migration@down-production: # Revert migration for production environment
migration@down-production:
	@cross-env APP_ENV=production npx migrate-mongo down -f migrations.config.js

.ONESHELL:
migration@down-development: # Revert migration for local environment
migration@down-development:
	@cross-env APP_ENV=development npx migrate-mongo down -f migrations.config.js

.ONESHELL:
migration@down-test: # Revert migration for test environment
migration@down-test:
	@cross-env APP_ENV=test npx migrate-mongo down -f migrations.config.js

.ONESHELL:
migration@down-e2e: # Revert migration for e2e environment
migration@down-e2e:
	@cross-env APP_ENV=e2e npx migrate-mongo down -f migrations.config.js

.ONESHELL:
migration@down-staging: # Revert migration for staging environment
migration@down-staging:
	@cross-env APP_ENV=staging npx migrate-mongo down -f migrations.config.js

.ONESHELL:
migration@down-testing: # Revert migration for testing environment
migration@down-testing:
	@cross-env APP_ENV=testing npx migrate-mongo down -f migrations.config.js

#########################################################
############### SHOW STATUS OF MIGRATIONS ###############
#########################################################

.ONESHELL:
migration@status: # Show migrations status for given environment
migration@status: check-env
	@cross-env APP_ENV=$(ENV) npx migrate-mongo status -f migrations.config.js

.ONESHELL:
migration@status-production: # Show migrations status for production environment
migration@status-production:
	@cross-env APP_ENV=production npx migrate-mongo status -f migrations.config.js

.ONESHELL:
migration@status-development: # Show migrations status for local environment
migration@status-development:
	@cross-env APP_ENV=development npx migrate-mongo status -f migrations.config.js

.ONESHELL:
migration@status-test: # Show migrations status for test environment
migration@status-test:
	@cross-env APP_ENV=test npx migrate-mongo status -f migrations.config.js

.ONESHELL:
migration@status-e2e: # Show migrations status for e2e environment
migration@status-e2e:
	@cross-env APP_ENV=e2e npx migrate-mongo status -f migrations.config.js

.ONESHELL:
migration@status-staging: # Show migrations status for staging environment
migration@status-staging:
	@cross-env APP_ENV=staging npx migrate-mongo status -f migrations.config.js

.ONESHELL:
migration@status-testing: # Show migrations status for testing environment
migration@status-testing:
	@cross-env APP_ENV=testing npx migrate-mongo status -f migrations.config.js
