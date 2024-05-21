# Use an official node runtime as a parent image
FROM node:latest

# Set the working directory
WORKDIR /app



# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .


EXPOSE 5173

# Build the React app
CMD ["npm", "run", "dev"]

# Use a smaller image to serve the built app
# FROM nginx:alpine
# COPY --from=0 /app/build /usr/share/nginx/html

# # Expose the port the app runs on
# EXPOSE 80

# # Run nginx
# CMD ["nginx", "-g", "daemon off;"]
