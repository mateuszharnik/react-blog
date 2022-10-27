##############################################
############### RUN JEST TESTS ###############
##############################################

.ONESHELL:
test: # Test client and server
test:
	@make test@client
	@make test@server
	@make test@shared

.ONESHELL:
test@server: # Test server
test@server:
	@cross-env NODE_ENV=test APP_ENV=test COVERAGE_DIR=server npx jest ./src/server --runInBand --coverage --env=node

.ONESHELL:
test@client: # Test client
test@client:
	@cross-env NODE_ENV=test APP_ENV=test COVERAGE_DIR=client npx jest ./src/client --runInBand --coverage

.ONESHELL:
test@shared: # Test shared
test@shared:
	@cross-env NODE_ENV=test APP_ENV=test COVERAGE_DIR=shared npx jest ./src/shared --runInBand --coverage

.ONESHELL:
test@scripts: # Test proptypes scripts
test@scripts:
	@cross-env NODE_ENV=test APP_ENV=test COVERAGE_DIR=scripts npx jest ./scripts/tests --runInBand --coverage

#############################################
############### RUN E2E TESTS ###############
#############################################

.ONESHELL:
e2e@open: # Open Cypress
e2e@open:
	@cross-env NODE_ENV=test APP_ENV=e2e npx cypress open

.ONESHELL:
e2e@suite: # Run Cypress tests for given suite
e2e@suite: check-suite
	@cross-env NODE_ENV=test APP_ENV=e2e npx cypress run --browser chrome --spec "./src/e2e/tests/integration/$(SUITE)/**.test.js"

.ONESHELL:
e2e@chrome: # Run Cypress tests in chrome browser
e2e@chrome:
	@cross-env NODE_ENV=test APP_ENV=e2e npx cypress run --browser chrome

.ONESHELL:
e2e@firefox: # Run Cypress tests in firefox browser
e2e@firefox:
	@cross-env NODE_ENV=test APP_ENV=e2e npx cypress run --browser firefox
