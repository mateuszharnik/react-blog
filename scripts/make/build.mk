#############################################
############### BUILD PROJECT ###############
#############################################

.ONESHELL:
build: # Build client and server for given environment
build: check-production-env
build:
	@make build@$(PROD_ENV)

.ONESHELL:
build@production: # Build client and server for production environment
build@production:
	@make build@client-production
	@make build@server
	@make build@purgecss

.ONESHELL:
build@staging: # Build client and server for staging environment
build@staging:
	@make build@client-staging
	@make build@server
	@make build@purgecss

.ONESHELL:
build@testing: # Build client and server for testing environment
build@testing:
	@make build@client-testing
	@make build@server
	@make build@purgecss

.ONESHELL:
build@client: # Build client for given environment
build@client: check-production-env
build@client:
	@make build@client-$(PROD_ENV)

.ONESHELL:
build@client-production: # Build client for production environment
build@client-production:
	@cross-env NODE_ENV=production APP_ENV=production npx webpack --mode=production --config ./webpack/webpack.config.client.js && rimraf -g dist/client/js/*.js.map && rimraf -g dist/client/css/*.css.map

.ONESHELL:
build@client-staging: # Build client for staging environment
build@client-staging:
	@cross-env NODE_ENV=production APP_ENV=staging npx webpack --mode=production --config ./webpack/webpack.config.client.js && rimraf -g dist/client/js/*.js.map && rimraf -g dist/client/css/*.css.map

.ONESHELL:
build@client-testing: # Build client for testing environment
build@client-testing:
	@cross-env NODE_ENV=production APP_ENV=testing npx webpack --mode=production --config ./webpack/webpack.config.client.js && rimraf -g dist/client/js/*.js.map && rimraf -g dist/client/css/*.css.map

.ONESHELL:
build@server: # Build server
build@server:
	@cross-env NODE_ENV=production npx webpack --mode=production --config ./webpack/webpack.config.server.js

.ONESHELL:
build@purgecss: # Purge unused styles
build@purgecss:
	@purgecss --css dist/client/css/css-libs.css --content dist/client/index.html dist/client/js/**/*.js --output dist/client/css/css-libs.css

#######################################################
############### BUILD AND START PROJECT ###############
#######################################################

.ONESHELL:
start-build: # Build and start project for given environment
start-build: check-production-env
start-build:
	@make start-build@$(PROD_ENV)

.ONESHELL:
start-build@production: # Build and start project in production environment
start-build@production: migration@up-production
start-build@production: build@client-production
start-build@production: build@server
start-build@production:
	@make build@purgecss
	@clear
	@cross-env NODE_ENV=production APP_ENV=production node ./dist/server/server.js

.ONESHELL:
start-build@staging: # Build and start project in staging environment
start-build@staging: migration@up-staging
start-build@staging: build@client-staging
start-build@staging: build@server
start-build@staging:
	@make build@purgecss
	@clear
	@cross-env NODE_ENV=production APP_ENV=staging node ./dist/server/server.js

.ONESHELL:
start-build@testing: # Build and start project in testing environment
start-build@testing: migration@up-testing
start-build@testing: build@client-testing
start-build@testing: build@server
start-build@testing:
	@make build@purgecss
	@clear
	@cross-env NODE_ENV=production APP_ENV=testing node ./dist/server/server.js
