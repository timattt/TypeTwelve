FROM node:latest
LABEL authors="timat"

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start", "--port", "3000"]