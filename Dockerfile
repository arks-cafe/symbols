# Build application from node image

FROM node:lts

# Create app directory

WORKDIR .

# Bundle app source

COPY . .

# Enable corepack

RUN corepack enable

# Install app dependencies

RUN pnpm install

# Build app

RUN pnpm run build:node

# Expose port

EXPOSE 3000

# Run app

CMD node build/index.js