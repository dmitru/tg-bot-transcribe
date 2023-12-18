import { Telegraf } from "telegraf";
import { config } from "../config";
import { message } from "telegraf/filters";
import OpenAi from "openai";
import { Uploadable } from "openai/uploads";
import fetch from "node-fetch";

const client = new OpenAi({ apiKey: config.openai.key });
export const bot = new Telegraf(config.telegram.botToken!);

bot.on(message("video_note"), async (ctx) => {
  const logTag = `video note ${ctx.message.message_id}`;
  console.log(`[${logTag}]: Got a new message`);
  const voiceFileId = ctx.message.video_note.file_id;

  console.log(`[${logTag}]: Getting the file URL...`);
  const voiceFile = await ctx.telegram.getFile(voiceFileId);
  const voiceUrl = `https://api.telegram.org/file/bot${config.telegram
    .botToken!}/${voiceFile.file_path}`;

  console.log(`[${logTag}]: Downloading file: ${voiceUrl}`);
  // Download the file with axios
  const response = await fetch(voiceUrl);

  const t1 = performance.now();
  console.log(`[${logTag}]: Transcribing file: ${voiceUrl}`);
  // Convert voice to text using OpenAI API
  const transcription = await convertVoiceToText(response);
  const t2 = performance.now();
  console.log(
    `[${logTag}]: ✅ Transcribing file ${voiceUrl} finished in: ${(
      (t2 - t1) /
      1000
    ).toFixed(1)} seconds.`,
  );

  ctx.reply(transcription);
});

// Transcriber bot
bot.on(message("voice"), async (ctx) => {
  const logTag = `voice ${ctx.message.message_id}`;
  console.log(`[${logTag}]: Got a new message`);
  const voiceFileId = ctx.message.voice.file_id;

  console.log(`[${logTag}]: Getting the file URL...`);
  const voiceFile = await ctx.telegram.getFile(voiceFileId);
  const voiceUrl = `https://api.telegram.org/file/bot${config.telegram
    .botToken!}/${voiceFile.file_path}`;

  console.log(`[${logTag}]: Downloading file: ${voiceUrl}`);
  // Download the file with axios
  const response = await fetch(voiceUrl);

  const t1 = performance.now();
  console.log(`[${logTag}]: Transcribing file: ${voiceUrl}`);
  // Convert voice to text using OpenAI API
  const transcription = await convertVoiceToText(response);
  const t2 = performance.now();
  console.log(
    `[${logTag}]: ✅ Transcribing file ${voiceUrl} finished in: ${(
      (t2 - t1) /
      1000
    ).toFixed(1)} seconds.`,
  );

  ctx.reply(transcription);
});

bot.on(message("audio"), async (ctx) => {
  const logTag = `audio ${ctx.message.message_id}`;
  console.log(`[${logTag}]: Got a new message`);
  const voiceFileId = ctx.message.audio.file_id;

  console.log(`[${logTag}]: Getting the file URL...`);
  const voiceUrl = await ctx.telegram.getFileLink(voiceFileId);

  console.log(`[${logTag}]: Downloading file: ${voiceUrl}`);
  // Download the file with axios
  const response = await fetch(voiceUrl);

  const t1 = performance.now();
  console.log(`[${logTag}]: Transcribing file: ${voiceUrl}`);
  // Convert voice to text using OpenAI API
  const transcription = await convertVoiceToText(response);
  const t2 = performance.now();
  console.log(
    `[${logTag}]: ✅ Transcribing file ${voiceUrl} finished in: ${(
      (t2 - t1) /
      1000
    ).toFixed(1)} seconds.`,
  );

  ctx.reply(transcription);
});

bot.on(message("video"), async (ctx) => {
  const logTag = `video ${ctx.message.message_id}`;
  console.log(`[${logTag}]: Got a new message`);
  const voiceFileId = ctx.message.video.file_id;

  console.log(`[${logTag}]: Getting the file URL...`);
  const voiceUrl = await ctx.telegram.getFileLink(voiceFileId);

  console.log(`[${logTag}]: Downloading file: ${voiceUrl}`);
  // Download the file with axios
  const response = await fetch(voiceUrl);

  const t1 = performance.now();
  console.log(`[${logTag}]: Transcribing file: ${voiceUrl}`);
  // Convert voice to text using OpenAI API
  const transcription = await convertVoiceToText(response);
  const t2 = performance.now();
  console.log(
    `[${logTag}]: ✅ Transcribing file ${voiceUrl} finished in: ${(
      (t2 - t1) /
      1000
    ).toFixed(1)} seconds.`,
  );

  ctx.reply(transcription);
});

async function convertVoiceToText(file: Uploadable) {
  const transcript = await client.audio.transcriptions.create({
    file,
    model: "whisper-1",
    response_format: "text",
  });
  return transcript;
}
