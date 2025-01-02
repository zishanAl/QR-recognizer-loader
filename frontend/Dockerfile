# Use the official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json /app/

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the frontend files into the container
COPY . /app/

# Build the React app
RUN npm run build

# Use an Nginx server to serve the build files
FROM nginx:1.23
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]