# # Development stage
# FROM node:16-alpine AS development

# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies including 'glob' and 'rimraf' for building
# RUN npm install glob rimraf
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN npm run build

# # Command to start the application is specified in docker-compose as command: pnpm run start:debug