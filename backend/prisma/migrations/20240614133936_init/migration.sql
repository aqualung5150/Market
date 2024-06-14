/*
  Warnings:

  - You are about to drop the `ChannelParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChannelParticipants" DROP CONSTRAINT "ChannelParticipants_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelParticipants" DROP CONSTRAINT "ChannelParticipants_userId_fkey";

-- DropTable
DROP TABLE "ChannelParticipants";

-- CreateTable
CREATE TABLE "ChannelsOnUsers" (
    "userId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,

    CONSTRAINT "ChannelsOnUsers_pkey" PRIMARY KEY ("userId","channelId")
);

-- AddForeignKey
ALTER TABLE "ChannelsOnUsers" ADD CONSTRAINT "ChannelsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelsOnUsers" ADD CONSTRAINT "ChannelsOnUsers_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
