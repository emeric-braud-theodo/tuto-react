FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG REACT_APP_BFF_URL
ENV REACT_APP_BFF_URL=$REACT_APP_BFF_URL
ARG REACT_APP_CLERK_PUBLISHABLE_KEY
ENV REACT_APP_CLERK_PUBLISHABLE_KEY=$REACT_APP_CLERK_PUBLISHABLE_KEY 

COPY . .
RUN npm run build

FROM node:20

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/build ./build

EXPOSE 8080

CMD ["sh", "-c", "serve -s build -l ${PORT:-8080}"]