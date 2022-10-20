# syntax=docker/dockerfile:1
FROM node:19-alpine
RUN apk add --no-cache g++ make
ENV NODE_ENV=PRODUCTION
WORKDIR /
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000