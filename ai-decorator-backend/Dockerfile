# Use Node.js 20 (as required by @google/genai)
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of your backend source code (like server.js)
COPY . .

# Tell Google Cloud what port your app listens on
EXPOSE 3001

# The command to start your server
CMD [ "node", "server.js" ]