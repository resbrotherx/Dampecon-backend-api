# Use Node.js 20 alpine
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy source code
COPY . .

# Create uploads folder
RUN mkdir -p uploads

# Set environment
ENV NODE_ENV=production
EXPOSE 5000

# Start server
CMD ["node", "src/app.js"]