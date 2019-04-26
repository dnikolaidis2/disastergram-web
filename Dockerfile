# Base image
FROM node:10.15.3

# Set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Add .bin file to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY ./src ./src
COPY ./public ./public

COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

# Start the app
CMD ["npm", "start"]
