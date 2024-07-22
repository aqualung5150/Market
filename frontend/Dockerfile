####################
#	build stage
####################

FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production && npm cache clean --force

COPY . .

RUN npm run build

####################
# production stage
####################

FROM nginx:latest

WORKDIR /app

COPY --from=builder /app/build ./build
COPY default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]