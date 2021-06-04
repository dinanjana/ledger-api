FROM node:11.5-slim

# Create direcotry
RUN mkdir -p /app

# Add code
ADD . /app

# Set final working directory
WORKDIR /app

RUN npm install

CMD ["npm", "run", "start"]