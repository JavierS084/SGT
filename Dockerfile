FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4030

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "dev"]
