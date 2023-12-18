import "dotenv/config";

export const config = {
  telegram: {
    botToken: process.env["TELEGRAM_BOT_TOKEN"],
  },
  openai: {
    key: process.env["OPENAI_APIKEY"],
  },
};
