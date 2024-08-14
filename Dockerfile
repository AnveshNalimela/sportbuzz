# Stage 1: Build the application using Node.js
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application using Vite
RUN npm run build

# Stage 2: Serve the built application using a lightweight web server
FROM node:18-alpine AS production

# Install `serve` to serve the build directory
RUN npm install -g serve

# Set the working directory inside the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist

# Expose the port that `serve` will use
COPY .env .

# Expose the port that `serve` will use
EXPOSE ${PORT:-5000}

# Start the server
CMD serve -s dist -l ${PORT:-5000}


# docker tag local-image:tagname new-repo:tagname
# docker push new-repo:tagname