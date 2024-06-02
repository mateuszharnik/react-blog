#############################################
############### CLEAN PROJECT ###############
#############################################

.ONESHELL:
clean: # Clean project builds
clean:
	@rimraf ./docker/docker-data && rimraf ./storybook-static && rimraf dist && rimraf coverage && rimraf yarn.lock && rimraf yarn-error.log && rimraf node_modules
