FROM node:latest

ADD . /work
WORKDIR /work/Sample-01/
RUN npm install

EXPOSE 3000/tcp

ENTRYPOINT npm run dev
