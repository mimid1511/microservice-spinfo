# Step 1: Build the application
FROM node:16-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install @prisma/client prisma --save
COPY . .
# Generate Prisma client
RUN npx prisma generate
RUN npm run build

# Step 2: Prepare the production image
FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
# Copy prisma schema and generated client
COPY prisma ./prisma
COPY --from=builder /usr/src/app/dist ./dist
# Generate Prisma client in production image, if needed
RUN npx prisma generate

CMD ["node", "dist/main"]