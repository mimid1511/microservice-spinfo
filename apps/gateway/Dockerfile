# Step 1: Build the application
FROM node:latest as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm uninstall bcrypt && npm cache clean --force
RUN npm install && npm install bcrypt --build-from-source --legacy-peer-deps

COPY . .
RUN npm run build

FROM node:latest
WORKDIR /usr/src/app

# Copy built artifacts and node_modules from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Set non-root user to run the application
# RUN adduser -D appuser
# USER appuser

CMD ["node", "dist/main"]
