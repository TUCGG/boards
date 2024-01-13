# Next.js Dockerfile with Node.js 18 on Alpine Linux
FROM node:18-alpine

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

WORKDIR /app/next-app

CMD ["npm", "run", "dev"]


