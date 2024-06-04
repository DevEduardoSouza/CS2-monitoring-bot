import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";

function inicializarTelegramBot() {
  return new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
}

function sendMessage(bot, chat_id, msg) {
  bot.sendMessage(chat_id, msg, { parse_mode: "Markdown" });
}

export { inicializarTelegramBot, sendMessage };