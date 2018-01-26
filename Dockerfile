FROM node:8.5.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port
EXPOSE 8080

# Compile typescript
RUN npm install -g typescript
RUN npm run build

# Start the app
ENTRYPOINT ["/usr/local/bin/npm", "start"]