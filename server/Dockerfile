# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code into the container
COPY . .

# Expose the port the server runs on (change if your server uses a different port)
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
