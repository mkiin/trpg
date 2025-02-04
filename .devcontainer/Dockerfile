FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

ARG USERNAME=node

# Config pnpm
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

# Update packages
RUN apt-get update

# Install Git
RUN apt-get install -y git

# Install sudo
RUN apt-get install -y sudo

RUN  echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME