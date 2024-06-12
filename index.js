const express = require("express");
const app = express();
const dotenv = require("dotenv");

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  Permissions,
  PermissionsBitField,
  User,
  ClientUser,
} = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
  ],
});

// Danh sách từ cấm
const bannedWords = ["đmm", "đm", "dm", "vl", "cc", "dcm"];
const zhe = [
  "zhế",
  "zhe",
  "dế",
  "thang de",
  "thằng dế",
  "díu",
  "diu dau",
  "de dau",
  "dé đâu",
  "diu oi",
  "díu ơi",
  "de oi",
  "dế ơi",
  "dé ơi",
];

client.once("ready", () => {
  app.get("/", (req, res) => {
    res.status(200).send(`${client.user.tag}!`);
  });
  app.listen(process.env.PORT);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  console.log(message.content);
  for (var i = 0; i < bannedWords.length; i++) {
    if (message.content.toLowerCase().includes(bannedWords[i])) {
      message.reply("Chửi bậy ăn cặc à?");
    }
  }
  if (message.content.toLowerCase() === "bôn") {
    message.channel.send("ăn cứttttt");
  }
  for (var i = 0; i < zhe.length; i++) {
    if (message.content.toLowerCase().includes(zhe[i])) {
      message.reply("Ơiiiii Zhé đây");
      break;
    }
  }

  if (message.mentions.members.size > 0) {
    const mentionedMembers = message.mentions.members;
    // Lặp qua tất cả các người được đề cập
    for (const [snowflake, member] of mentionedMembers) {
      // Truy vấn thông tin của người được đề cập
      const user = await client.users.fetch(member.id);
      if (member.user.bot || message.author.bot) {
        return;
      } else {
        if (member.presence === null) {
          message.channel.send(`${user.displayName} hiện đang offline.`);
        } else if (member.presence.status === "online") {
          message.channel.send(`${user.displayName} hiện đang online.`);
        } else if (member.presence.status === "idle") {
          message.channel.send(`${user.displayName} hiện đang khọt zzz.`);
        } else if (member.presence.status === "dnd") {
          message.channel.send(`${user.displayName} hiện đang pận.`);
        } else {
          message.channel.send(`${user.displayName} hiện đang offline.`);
        }
      }
    }
  }
});

client.login(process.env.TOKEN);