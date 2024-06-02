####################################
############### LINT ###############
####################################

.ONESHELL:
lint: # Lint all files
lint:
	@make lint@js
	@make lint@style

.ONESHELL:
lint@js: # Lint all js and jsx files
lint@js:
	@cross-env NODE_ENV=production npx eslint ./src/ --ext .js,.jsx,.json

.ONESHELL:
lint@server: # Lint all js files in server directory
lint@server:
	@cross-env NODE_ENV=production npx eslint ./src/server/ --ext .js,.json

.ONESHELL:
lint@client: # Lint all js and jsx files in client directory
lint@client:
	@cross-env NODE_ENV=production npx eslint ./src/client/ --ext .js,.jsx,.json

.ONESHELL:
lint@e2e: # Lint all js files in e2e directory
lint@e2e:
	@cross-env NODE_ENV=production npx eslint ./src/e2e/ --ext .js,.json

.ONESHELL:
lint@shared: # Lint all js files in shared directory
lint@shared:
	@cross-env NODE_ENV=production npx eslint ./src/shared/ --ext .js

.ONESHELL:
lint@scripts: # Lint all js files in scripts directory
lint@scripts:
	@cross-env NODE_ENV=production npx eslint ./scripts/ --ext .js

.ONESHELL:
lint@style: # Lint all css and scss files in client directory
lint@style:
	@cross-env NODE_ENV=production npx stylelint ./src/client/**/*.{css,scss}

.ONESHELL:
lint@eslint: # Lint .eslintrc.js file
lint@eslint:
	@cross-env NODE_ENV=production npx eslint .eslintrc.js --no-ignore .eslintrc.js

.ONESHELL:
lint@storybook: # Lint .storybook files
lint@storybook:
	@cross-env NODE_ENV=production npx eslint .storybook/ --ext .js

##################################################
############### LINT WITH FIX FLAG ###############
##################################################

.ONESHELL:
lint-fix: # Lint and fix all files
lint-fix:
	@make lint-fix@js
	@make lint-fix@style

.ONESHELL:
lint-fix@js: # Lint and fix all js and jsx files
lint-fix@js:
	@cross-env NODE_ENV=production npx eslint ./src/ --ext .js,.jsx,.json --fix

.ONESHELL:
lint-fix@server: # Lint and fix all js files in server directory
lint-fix@server:
	@cross-env NODE_ENV=production npx eslint ./src/server/ --ext .js,.json --fix

.ONESHELL:
lint-fix@client: # Lint and fix all js and jsx files in client directory
lint-fix@client:
	@cross-env NODE_ENV=production npx eslint ./src/client/ --ext .js,.jsx,.json --fix

.ONESHELL:
lint-fix@e2e: # Lint and fix all js files in e2e directory
lint-fix@e2e:
	@cross-env NODE_ENV=production npx eslint ./src/e2e/ --ext .js,.json --fix

.ONESHELL:
lint-fix@shared: # Lint and fix all js files in shared directory
lint-fix@shared:
	@cross-env NODE_ENV=production npx eslint ./src/shared/ --ext .js --fix

.ONESHELL:
lint-fix@scripts: # Lint and fix all js files in scripts directory
lint-fix@scripts:
	@cross-env NODE_ENV=production npx eslint ./scripts/ --ext .js --fix

.ONESHELL:
lint-fix@style: # Lint and fix all css and scss files in client directory
lint-fix@style:
	@cross-env NODE_ENV=production npx stylelint ./src/client/**/*.{css,scss} --fix

.ONESHELL:
lint-fix@eslint: # Lint and fix .eslintrc.js file
lint-fix@eslint:
	@cross-env NODE_ENV=production npx eslint .eslintrc.js --no-ignore .eslintrc.js --fix

.ONESHELL:
lint-fix@storybook: # Lint and fix .storybook files
lint-fix@storybook:
	@cross-env NODE_ENV=production npx eslint .storybook/ --ext .js --fix
