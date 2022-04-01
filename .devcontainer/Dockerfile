FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-16-bullseye

# packages
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    vim \
    tmux \
    ruby2.7-dev

# awscli
ARG AWSCLI_DIR=/tmp/awscli
RUN mkdir -p ${AWSCLI_DIR} \
    && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "${AWSCLI_DIR}/awscliv2.zip" \
    && unzip ${AWSCLI_DIR}/awscliv2.zip -d ${AWSCLI_DIR} \
    && sudo ${AWSCLI_DIR}/aws/install \
    && rm -rf ${AWSCLI_DIR}

# shopifycli
RUN apt-get install --no-install-recommends -y ruby2.7-dev
RUN gem install shopify-cli

# shell
RUN echo "bindkey -v" >> /home/node/.zshrc
