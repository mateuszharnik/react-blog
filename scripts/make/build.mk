#############################################
############### BUILD PROJECT ###############
#############################################

.ONESHELL:
build: # Build client and server
build:
	@make build@client
	@make build@server
	@make build@purgecss

.ONESHELL:
build@server: # Build server
build@server:
	@cross-env NODE_ENV=production npx webpack -p --mode=production --config ./webpack/webpack.config.server.js

.ONESHELL:
build@client: # Build client
build@client:
	@cross-env NODE_ENV=production npx webpack -p --mode=production --config ./webpack/webpack.config.client.js && rimraf dist/client/js/*.js.map

.ONESHELL:
build@purgecss: # Purge unused styles
build@purgecss:
	@npx purgecss --css dist/client/css/styles.css --content dist/client/index.html dist/client/js/**/*.js --output dist/client/css/styles.css
