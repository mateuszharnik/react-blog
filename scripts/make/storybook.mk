#########################################
############### STORYBOOK ###############
#########################################

.ONESHELL:
storybook@build: # Build storybook
storybook@build:
	@npx storybook build

.ONESHELL:
storybook@start: # Start storybook
storybook@start:
	@npx storybook dev -p 6006

.ONESHELL:
storybook@init: # Init storybook
storybook@init:
	@npx storybook init
