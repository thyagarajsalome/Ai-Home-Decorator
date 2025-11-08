# Use an official Node.js runtime as a parent image
FROM node:20-slim

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./ 
RUN npm install --omit=dev

# Bundle app source
COPY . .

# Run the server
# Cloud Run will provide the $PORT environment variable automatically.
CMD [ "node", "server.js" ]