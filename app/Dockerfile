FROM node:12-alpine
WORKDIR /app

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

EXPOSE 3000 3000

# start app
CMD ["npm", "start"]