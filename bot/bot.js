import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Salom! Bot ishga tushdi 🚀');
});

bot.launch();