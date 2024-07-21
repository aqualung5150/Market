####################
#	build stage
####################

FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

# test
COPY ./prisma ./prisma

RUN npm install

COPY . .
# COPY /uploads/profileImages/default.png /uploads/profileImages/default.png

## prisma
# test
# RUN npx prisma generate

RUN npm run build

####################
# production stage
####################

FROM node:lts-alpine

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json .
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/uploads ./uploads
# test
COPY ./prisma ./prisma

RUN npm install

# prisma
# COPY ./prisma ./prisma
# EXPOSE 3001

# CMD ["npx", "prisma", "migrate", "reset", "&&", "db", "push", "&&", "npx", "prisma", "migrate", "deploy", "&&", "node", "dist/main"]
CMD ["npm", "run", "start:migrate:prod"]