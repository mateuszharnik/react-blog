#############################################
############### START PROJECT ###############
#############################################

.ONESHELL:
start@production: # Start project in production environment
start@production: migration@up-production
start@production: build@client
start@production: build@server
start@production:
	@make build@purgecss
	@clear
	@cross-env APP_ENV=production node ./dist/server/server.js

.ONESHELL:
start@staging: # Start project in staging environment
start@staging: migration@up-staging
start@staging: build@client
start@staging: build@server
start@staging:
	@make build@purgecss
	@clear
	@cross-env APP_ENV=staging node ./dist/server/server.js

.ONESHELL:
start@testing: # Start project in testing environment
start@testing: migration@up-testing
start@testing: build@client
start@testing: build@server
start@testing:
	@make build@purgecss
	@clear
	@cross-env APP_ENV=testing node ./dist/server/server.js

############################################
############### START CLIENT ###############
############################################

.ONESHELL:
dev@client: # Start client in local environment
dev@client:
	@cross-env NODE_ENV=development npx webpack-dev-server --config ./webpack/webpack.config.client.js --mode=development

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
dev@development: # Start development server in local environment
dev@development:
	@npx concurrently -n "@frontend,@backend" -c "blue,red" "make dev@client" "make dev@server DEV_ENV=development"

.ONESHELL:
dev@test: # Start development server in test environment
dev@test:
	@npx concurrently -n "@frontend,@backend" -c "blue,red" "make dev@client" "make dev@server DEV_ENV=test"

.ONESHELL:
dev@e2e: # Start development server in e2e environment
dev@e2e:
	@npx concurrently -n "@frontend,@backend" -c "blue,red" "make dev@client" "make dev@server DEV_ENV=e2e"
