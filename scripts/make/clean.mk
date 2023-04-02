#############################################
############### CLEAN PROJECT ###############
#############################################

.ONESHELL:
clean: # Clean project builds
clean:
	@rimraf ./docker/docker-data && rimraf dist && rimraf coverage && rimraf yarn.lock && rimraf node_modules
