FROM node:10-alpine

COPY ["package.json", "package-lock.json", "./usr/src/"]

WORKDIR /usr/src

RUN npm install --production

COPY [".", "/usr/src/"]

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "server.js"]
