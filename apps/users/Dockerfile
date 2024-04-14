# Step 1: Build the application
FROM node:16-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install --legacy-peer-deps
COPY . .
RUN npx prisma generate
RUN npm run build

# Step 2: Prepare the production image
FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/prisma ./prisma
COPY package*.json ./
# If you are running Prisma generate again in production, ensure dependencies needed are installed
RUN npm install --only=production --legacy-peer-deps
COPY --from=builder /usr/src/app/dist ./dist
RUN npx prisma generate

CMD ["node", "dist/main"]
