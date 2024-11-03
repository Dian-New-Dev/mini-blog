# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the client code into the container
COPY . .

# Build the React app for production
RUN npm run build

# Install a simple server to serve the built app
RUN npm install -g serve

# Expose the port the app runs on (default for serve)
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build"]
