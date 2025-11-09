FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Copy the rest of the app
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Environment setup
ENV NODE_ENV=production
EXPOSE 5000

# Start the app
CMD ["node", "src/app.js"]
