####################
#	build stage
####################

FROM node:lts-alpine AS builder

WORKDIR /app

COPY --chown=node:node package*.json .
COPY --chown=node:node ./prisma ./prisma

RUN npm ci --only=production && npm cache clean --force

COPY --chown=node:node . .

RUN npm run build

USER node

####################
# production stage
####################

FROM node:lts-alpine

WORKDIR /app

ENV NODE_ENV production

COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package*.json .
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node ./uploads ./uploads
COPY --chown=node:node ./data ./data
COPY --chown=node:node ./prisma ./prisma
COPY --chown=node:node run.sh .
COPY --chown=node:node tsconfig.json .

USER node

CMD ["sh", "run.sh"];