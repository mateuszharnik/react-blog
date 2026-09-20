#############################################
############### CLEAN PROJECT ###############
#############################################

.ONESHELL:
clean: # Clean project builds
clean:
	@rimraf docker/docker-data && rimraf storybook-static && rimraf dist && rimraf coverage && rimraf node_modules && rimraf .husky/_ && rimraf .devcontainer/docker-data && rimraf .devcontainer/.env
