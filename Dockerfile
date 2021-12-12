FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
ENV LC_ALL=C.UTF-8
RUN apt-get update && apt-get install -y curl 
RUN apt-get update && apt-get install -y gnupg2
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg > /etc/apt/pubkey.gpg
RUN apt-key add /etc/apt/pubkey.gpg
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install -y npm
RUN npm install -g n
RUN n latest

RUN npm install -g ts-node
RUN apt install -y yarn
RUN apt install -y --no-install-recommends yarn
