FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install || (cat /root/.npm/_logs/* && exit 1)

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]