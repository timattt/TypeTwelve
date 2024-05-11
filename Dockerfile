FROM node:latest
LABEL authors="timat"

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "start", "--port", "3000"]