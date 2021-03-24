FROM node:10-alpine

WORKDIR /usr/src

EXPOSE 3000

CMD ["npx", "nodemon", "-L", "server.js"]
