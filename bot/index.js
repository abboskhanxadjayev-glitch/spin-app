import "dotenv/config";
import { Markup, Telegraf } from "telegraf";
import { loadConfig } from "../server/lib/config.js";
import { initDb } from "../server/lib/db.js";
import { upsertTelegramUser } from "../server/lib/repositories.js";

const config = loadConfig();

if (!config.botToken) {
  throw new Error("BOT_TOKEN is required. Copy .env.example to .env and fill BOT_TOKEN.");
}

const db = initDb(config);
const bot = new Telegraf(config.botToken);

bot.start(async (ctx) => {
  if (ctx.from) {
    upsertTelegramUser(db, ctx.from);
  }

  const appUrl = config.miniAppUrl;
  const isSecureMiniAppUrl = /^https:\/\//i.test(appUrl);
  const keyboard = isSecureMiniAppUrl
    ? Markup.inlineKeyboard([
        [Markup.button.webApp("Open Spin Mini App", appUrl)],
        [Markup.button.url("Open in browser", appUrl)],
      ])
    : undefined;

  const text = [
    "Spin Mini App tayyor.",
    "",
    isSecureMiniAppUrl
      ? "1. Pastdagi tugma bilan Mini App ni oching."
      : "1. MINI_APP_URL hozir http://localhost bo'lgani uchun Telegram tugma linkini qabul qilmaydi.",
    "2. Web app serverga bootstrap so'rov yuboradi.",
    "3. Foydalanuvchi SQLite ichida yaratiladi yoki yangilanadi.",
    isSecureMiniAppUrl
      ? "4. /start oqimi Telegram ichida testga tayyor."
      : `4. Haqiqiy Telegram Mini App test uchun MINI_APP_URL ni HTTPS ga almashtiring. Joriy local preview: ${appUrl}`,
  ].join("\n");

  if (keyboard) {
    await ctx.reply(text, keyboard);
  } else {
    await ctx.reply(text);
  }
});

bot.catch((error) => {
  console.error("bot error", error);
});

startBot();

async function syncMiniAppLaunchConfig() {
  const appUrl = config.miniAppUrl;
  if (!/^https:\/\//i.test(appUrl)) {
    console.warn("mini app URL is not HTTPS, skipping Telegram launch config sync");
    return;
  }

  try {
    await bot.telegram.callApi("setChatMenuButton", {
      menu_button: {
        type: "web_app",
        text: "Open Spin Mini App",
        web_app: {
          url: appUrl,
        },
      },
    });
    const currentMenuButton = await bot.telegram.callApi("getChatMenuButton", {});
    console.log(`chat menu button synced to ${appUrl}`);
    console.log(`current chat menu button type: ${currentMenuButton.type}`);
  } catch (error) {
    console.error("failed to sync chat menu button", error);
  }
}

async function startBot() {
  try {
    const me = await bot.telegram.getMe();
    console.log(`spin bot connected as @${me.username}`);
    console.log(`mini app URL: ${config.miniAppUrl}`);
    await syncMiniAppLaunchConfig();
    await bot.launch();
  } catch (error) {
    console.error("bot startup error", error);
    process.exit(1);
  }
}

function shutdown() {
  bot.stop("shutdown");
  db.close();
  process.exit(0);
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
