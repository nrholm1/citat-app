FROM node 
#:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
COPY yarn.lock .
RUN npm install
RUN yarn install
RUN npm install react-scripts -g
RUN npm install typescript

# add app
COPY . .

EXPOSE 3000 3000

# start app
CMD ["npm", "start"]