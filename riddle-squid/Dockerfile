FROM node:16
WORKDIR /app

# Environment variables
ENV DB_URL=${DB_URL}
ENV GQL_PORT=${GQL_PORT}
ENV RPC_SEPOLIA_URL=${RPC_SEPOLIA_URL}

# Expose the port
EXPOSE ${GQL_PORT}

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Install sqd globally
RUN npm install -g @subsquid/cli

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/bin/sh", "-c", "/app/start.sh"]