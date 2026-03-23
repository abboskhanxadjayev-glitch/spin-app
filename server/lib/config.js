import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

export function loadConfig(env = process.env) {
  const port = Number(env.PORT || 3000);
  const webAppUrl =
    env.WEB_APP_URL ||
    env.MINI_APP_URL ||
    `http://localhost:${port}/app`;

  return {
    rootDir,
    port,
    botToken: env.BOT_TOKEN || "",
    miniAppUrl: webAppUrl,
    webAppUrl,
    databasePath: path.resolve(rootDir, env.DATABASE_PATH || "server/db/spin.sqlite"),
    appTokenSecret: env.APP_TOKEN_SECRET || env.BOT_TOKEN || "spin-mini-app-demo-secret",
    timeZone: env.APP_TIME_ZONE || "Asia/Tashkent",
    allowUnsafeInitData: String(env.ALLOW_UNSAFE_INIT_DATA || "").toLowerCase() === "true",
    mediaAudioHeartsCost: Number(env.MEDIA_AUDIO_HEARTS_COST || 5),
    mediaVideoHeartsCost: Number(env.MEDIA_VIDEO_HEARTS_COST || 12),
    youtubeApiKey: env.YOUTUBE_API_KEY || "",
    mediaEnabled: Boolean(env.YOUTUBE_API_KEY),
  };
}
