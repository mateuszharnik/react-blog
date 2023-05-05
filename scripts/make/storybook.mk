#########################################
############### STORYBOOK ###############
#########################################

.ONESHELL:
storybook@build: # Build storybook
storybook@build:
	@npx build-storybook

.ONESHELL:
storybook@start: # Start storybook
storybook@start:
	@npx start-storybook -p 6006

.ONESHELL:
storybook@init: # Init storybook
storybook@init:
	@npx sb init
