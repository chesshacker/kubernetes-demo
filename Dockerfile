FROM node:8-alpine
WORKDIR /app
COPY [ "frontend/package.json", "frontend/yarn.lock", "./frontend/" ]
RUN (cd frontend && yarn install && yarn cache clean)
COPY [ "backend/package.json", "backend/package-lock.json", "./backend/" ]
RUN (cd backend && npm install && npm cache clean --force)
COPY . ./
RUN (cd frontend && yarn run build)
CMD (cd backend && npm start)
EXPOSE 3000
