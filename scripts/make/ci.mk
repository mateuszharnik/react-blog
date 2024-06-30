###################################################
################### CI SCRIPTS ####################
############### ONLY USED FOR CI/CD ###############
###################################################

.ONESHELL:
create-env: # Create .env file
create-env:
	@./scripts/shell/create-env.sh

.ONESHELL:
start@e2e: # Start project in e2e environment
start@e2e:
	@cross-env NODE_ENV=production APP_ENV=e2e node ./dist/server/server.js

.ONESHELL:
build@e2e: # Build client and server for e2e environment
build@e2e:
	@make build@client-e2e
	@make build@server
	@make build@purgecss

.ONESHELL:
build@client-e2e: # Build client for e2e environment
build@client-e2e:
	@cross-env NODE_ENV=production APP_ENV=e2e npx webpack --mode=production --config ./webpack/webpack.config.client.js && rimraf -g dist/client/js/*.js.map && rimraf -g dist/client/css/*.css.map
