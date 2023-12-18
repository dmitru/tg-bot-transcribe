import { Telegraf } from "telegraf";
import { config } from "../config";
import { message } from "telegraf/filters";

export const bot = new Telegraf(config.telegram.botToken!);

// Echo-bot
bot.on(message("text"), async (ctx) => {
  console.log(ctx.message);
  ctx.reply(ctx.message.text);
});
