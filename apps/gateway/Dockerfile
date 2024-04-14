FROM node:16-alpine as builder
WORKDIR /usr/src/app
RUN apk add --no-cache python3 py3-pip make g++ \
    && ln -sf python3 /usr/bin/python
COPY package*.json ./
RUN npm install --legacy-peer-deps @nestjs/common @nestjs/core @nestjs/jwt @nestjs/passport
RUN ls -la node_modules/@nestjs
COPY . .
RUN npm run build
# CMD ["node", "dist/main"]

FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
CMD ["sh", "-c", "npm rebuild bcrypt --build-from-source && node dist/main"]
