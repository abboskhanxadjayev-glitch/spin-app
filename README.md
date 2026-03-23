# Spin Telegram Mini App

Node.js backend, Telegram Mini App frontend, SQLite storage, and Socket.IO realtime room for the Spin game.

## Stack

- Node.js
- Express
- Socket.IO
- SQLite via `better-sqlite3`
- Telegraf bot

## Project structure

```text
spin/
  bot/
    index.js
  server/
    app.js
    index.js
    db/
    lib/
    routes/
  web/
    index.html
    styles.css
    app.js
  package.json
  .env.example
```

## Local setup

1. Copy [`.env.example`](C:/Users/Abbosxon/Documents/spin/.env.example) to `.env`
2. Fill these values:
   - `BOT_TOKEN`
   - `WEB_APP_URL` or `MINI_APP_URL`
   - `APP_TOKEN_SECRET`
   - `YOUTUBE_API_KEY` if you want YouTube search enabled
3. Install dependencies:
   - `npm install`
4. Start the server:
   - `npm start`
5. Open these URLs locally:
   - `http://localhost:3000/api/health`
   - `http://localhost:3000/app`

## Render deploy

Create a new **Web Service** on Render and connect this GitHub repository.

### Render settings

- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

### Render environment variables

Set these in the Render dashboard:

- `PORT=10000`
- `BOT_TOKEN=...`
- `WEB_APP_URL=https://your-app.onrender.com/app`
- `APP_TOKEN_SECRET=replace_with_random_secret`
- `DATABASE_PATH=server/db/spin.sqlite`
- `APP_TIME_ZONE=Asia/Tashkent`
- `ALLOW_UNSAFE_INIT_DATA=false`
- `MEDIA_AUDIO_HEARTS_COST=5`
- `MEDIA_VIDEO_HEARTS_COST=12`
- `YOUTUBE_API_KEY=` optional

Notes:

- `WEB_APP_URL` is preferred for production.
- `MINI_APP_URL` is still supported as a fallback for older local setups.
- If `YOUTUBE_API_KEY` is empty, the app still boots normally; YouTube search and media queue add endpoints return a friendly disabled error instead of breaking the app.

## Telegram Mini App config

After Render deploy succeeds:

1. Open BotFather
2. Go to your bot
3. Update Mini App URL to:
   - `https://your-app.onrender.com/app`
4. If you use Menu Button, update that URL too

## Important endpoints

- `GET /api/health`
- `POST /api/bootstrap`
- `GET /api/user`
- `POST /api/room/join`
- `GET /api/room`
- `POST /api/chat/send`
- `GET /api/chat/messages`
- `POST /api/spin`
- `GET /api/gifts`
- `POST /api/gifts/send`
- `GET /api/media/state`
- `GET /api/media/queue`
- `GET /api/youtube/search?q=`

## Render-friendly behavior

- Server listens on `process.env.PORT || 3000`
- `web/` is served statically by Express
- `/app` always returns the Mini App shell
- Socket.IO uses the same origin and reconnects automatically
- HTTPS Render origin upgrades Socket.IO transport to secure websocket flow automatically
- Unhandled app errors return safe `500` responses instead of crashing the process

## Quick smoke test

After `npm start`:

1. Open `/api/health`
2. Open `/app`
3. Confirm frontend loads
4. Confirm server logs show the correct `mini app URL`
5. Open Telegram Mini App through the updated BotFather URL
