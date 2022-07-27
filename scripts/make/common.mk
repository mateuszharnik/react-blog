#########################################
############### VARIABLES ###############
#########################################

ENV = development
AVAILABLE_ENVS = development production test e2e staging testing
AVAILABLE_ENVS_LIST = development, production, test, e2e, staging, testing

SUITE = **
AVAILABLE_SUITES = ** contact
AVAILABLE_SUITES_LIST = **, contact

DEV_ENV = development
AVAILABLE_DEV_ENVS = development test e2e
AVAILABLE_DEV_ENVS_LIST = development, test, e2e

#########################################
############### FUNCTIONS ###############
#########################################

check-env: # Validate ENV variable
ifeq ($(filter $(ENV),$(AVAILABLE_ENVS)),)
	@echo -e "Invalid ENV variable. ENV must be one of [$(AVAILABLE_ENVS_LIST)]" && exit 1
endif

check-development-env: # Validate DEV_ENV variable
ifeq ($(filter $(DEV_ENV),$(AVAILABLE_DEV_ENVS)),)
	@echo -e "Invalid DEV_ENV variable. DEV_ENV must be one of [$(AVAILABLE_DEV_ENVS_LIST)]" && exit 1
endif

check-suite: # Validate SUITE variable
ifeq ($(filter $(SUITE),$(AVAILABLE_SUITES)),)
	@echo -e "Invalid SUITE variable. SUITE must be one of [$(AVAILABLE_SUITES_LIST)]" && exit 1
endif

#######################################
############### INSTALL ###############
#######################################

.ONESHELL:
install@global: # Install all global npm dependencies
install@global:
	@npm install -g rimraf cross-env yarn@1.22.17
