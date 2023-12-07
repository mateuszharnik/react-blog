#############################################
############### START PROJECT ###############
#############################################

.ONESHELL:
start: # Start project for given environment
start: check-production-env
start: migration@up-$(PROD_ENV)
start:
	@cross-env APP_ENV=$(PROD_ENV) node ./dist/server/server.js

.ONESHELL:
start@production: # Start project in production environment
start@production: migration@up-production
start@production:
	@cross-env APP_ENV=production node ./dist/server/server.js

.ONESHELL:
start@staging: # Start project in staging environment
start@staging: migration@up-staging
start@staging:
	@cross-env APP_ENV=staging node ./dist/server/server.js

.ONESHELL:
start@testing: # Start project in testing environment
start@testing: migration@up-testing
start@testing:
	@cross-env APP_ENV=testing node ./dist/server/server.js

############################################
############### START CLIENT ###############
############################################

.ONESHELL:
dev@client: # Start client for given environment
dev@client: check-development-env
dev@client:
	@cross-env NODE_ENV=development APP_ENV=$(DEV_ENV) npx webpack-dev-server --config ./webpack/webpack.config.client.js --mode=development

############################################
############### START SERVER ###############
############################################

.ONESHELL:
dev@server: # Start server for given environment
dev@server: check-development-env
dev@server: migration@up-$(DEV_ENV)
dev@server:
	@cross-env NODE_ENV=development APP_ENV=$(DEV_ENV) npx nodemon --exec babel-node ./src/server

########################################################
############### START DEVELOPMENT SERVER ###############
########################################################

.ONESHELL:
dev: # Start development server for given environment
dev: check-development-env
dev:
	@concurrently -n "@frontend,@backend" -c "blue,red" "make dev@client DEV_ENV=$(DEV_ENV)" "make dev@server DEV_ENV=$(DEV_ENV)"

.ONESHELL:
dev@development: # Start development server in local environment
dev@development:
	@concurrently -n "@frontend,@backend" -c "blue,red" "make dev@client DEV_ENV=development" "make dev@server DEV_ENV=development"

.ONESHELL:
dev@test: # Start development server in test environment
dev@test:
	@concurrently -n "@frontend,@backend" -c "blue,red" "make dev@client DEV_ENV=test" "make dev@server DEV_ENV=test"

.ONESHELL:
dev@e2e: # Start development server in e2e environment
dev@e2e:
	@concurrently -n "@frontend,@backend" -c "blue,red" "make dev@client DEV_ENV=e2e" "make dev@server DEV_ENV=e2e"
