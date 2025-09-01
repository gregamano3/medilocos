FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Install serve to serve static files
RUN npm install -g serve

EXPOSE 9012

# Serve the static files from the out directory
CMD ["serve", "-s", "out", "-l", "9012"]