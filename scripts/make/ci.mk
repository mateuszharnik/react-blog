###################################################
################### CI SCRIPTS ####################
############### ONLY USED FOR CI/CD ###############
###################################################

.ONESHELL:
start@e2e: # Start project in e2e environment
start@e2e:
	@cross-env NODE_ENV=production APP_ENV=e2e node ./dist/server/server.js
