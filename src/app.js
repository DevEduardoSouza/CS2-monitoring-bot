import TelegramBot from "node-telegram-bot-api";
import { getData } from "./http/http.js";
import { filter, formatMatchMessage } from "./utils/util.js";
import "dotenv/config";

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

async function init(chatId) {
  try {
    const data = await getData();
    const matchesCS2 = filter(data, 46);
    const formattedMessages = matchesCS2.map(formatMatchMessage);

    const messageToSend = formattedMessages.join("\n");

    if (chatId) {
      bot.sendMessage(chatId, messageToSend, { parse_mode: "Markdown" });
    } else {
      console.error("ChatId não definido.");
    }
  } catch (error) {
    console.error("Erro ao inicializar:", error.message);
  }
}

bot.onText(/\/startcs2/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "O bot está ativo e monitorando jogos de cs2!");
  setInterval(() => init(chatId), 60000);
});
