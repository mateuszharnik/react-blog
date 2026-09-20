# Install Node.js
FROM node:20.12.2

# Install make
RUN apt-get update && apt-get install -y make libgtk-3-0 libgbm-dev libnotify-dev libnss3 libxss1 libasound2 libxtst6 xauth xvfb && rm -rf /var/lib/apt/lists/*

# Set workdir
WORKDIR /workspaces/react-blog

# Reference - https://github.com/devcontainers/images/blob/main/src/javascript-node/.devcontainer/Dockerfile
# Define variables
ARG USERNAME=node
ARG NPM_GLOBAL=/usr/local/share/npm-global

# Add NPM global to PATH
ENV PATH=${NPM_GLOBAL}/bin:${PATH}

# Configure global npm install location, use group to adapt to UID/GID changes
RUN if ! cat /etc/group | grep -e "^npm:" > /dev/null 2>&1; then groupadd -r npm; fi \
  && usermod -a -G npm ${USERNAME} \
  && umask 0002 \
  && mkdir -p ${NPM_GLOBAL} \
  && touch /usr/local/etc/npmrc \
  && chown ${USERNAME}:npm ${NPM_GLOBAL} /usr/local/etc/npmrc \
  && chmod g+s ${NPM_GLOBAL} \
  && npm config -g set prefix ${NPM_GLOBAL} \
  && su ${USERNAME} -c "npm config -g set prefix ${NPM_GLOBAL}" \
  # If you update list of packages please also update this list in the scripts/make/common.mk
  && su ${USERNAME} -c "umask 0002 && npm i -g pnpm@10.27.0 rimraf@5.0.10 cross-env@7.0.3 concurrently@8.2.2 purgecss@6.0.0" \
  && npm cache clean --force > /dev/null 2>&1
