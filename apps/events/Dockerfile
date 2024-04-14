FROM node:16-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install --legacy-peer-deps
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY package*.json ./
# RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
RUN npx prisma generate

CMD ["node", "dist/main"]
