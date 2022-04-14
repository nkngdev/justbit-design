FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY . .

RUN apk add --no-cache python  build-base gcc wget

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install

RUN npm run configure

# RUN npm run build

# RUN ls -al

CMD [ "npm", "run", "generate" ]
