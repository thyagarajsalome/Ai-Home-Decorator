# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json and install dependencies
# FIX: Using relative paths here (./) since the Dockerfile is in the build context.
COPY package*.json ./ 
RUN npm install --omit=dev

# Bundle app source
# FIX: Copy everything else from the build context.
COPY . .

# Cloud Run defaults to PORT 8080.
ENV PORT 8080
EXPOSE 8080

# Run the server
CMD [ "node", "server.js" ]