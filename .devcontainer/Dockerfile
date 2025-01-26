FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

ARG USERNAME=node

# Config pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

# Set alias
RUN alias pn=pnpm

# Update packages
RUN if [ "debian" == "alpine" ] ; then apk update ; else apt-get update ; fi

# Install Git
RUN if [ "debian" == "alpine" ] ; then apk add git ; else apt-get install -y git ; fi

# Install sudo
RUN if [ "debian" == "alpine" ] ; then apk add sudo ; else apt-get install -y sudo ; fi

RUN  echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME