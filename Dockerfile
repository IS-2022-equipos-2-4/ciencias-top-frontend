FROM node:19-alpine
WORKDIR /home/app
RUN npm install -g @angular/cli
RUN adduser -g -S -D ${USER}
USER ${USER}