import crypto from "node:crypto";

export function parseInitData(initDataRaw) {
  const params = new URLSearchParams(initDataRaw || "");
  const userRaw = params.get("user");

  return {
    hash: params.get("hash"),
    user: userRaw ? JSON.parse(userRaw) : null,
    startParam: params.get("start_param"),
    authDate: params.get("auth_date"),
    queryId: params.get("query_id"),
  };
}

export function verifyTelegramInitData(initDataRaw, botToken) {
  if (!initDataRaw || !botToken) {
    return false;
  }

  const params = new URLSearchParams(initDataRaw);
  const receivedHash = params.get("hash");

  if (!receivedHash) {
    return false;
  }

  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();

  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  return calculatedHash === receivedHash;
}

export function resolveTelegramUser({ initDataRaw, botToken, allowUnsafeInitData = false }) {
  const parsed = parseInitData(initDataRaw);

  if (parsed.user && verifyTelegramInitData(initDataRaw, botToken)) {
    return {
      telegramUser: parsed.user,
      startParam: parsed.startParam || null,
    };
  }

  if (parsed.user && allowUnsafeInitData) {
    console.warn("[telegram-auth] accepting unsafe initData fallback", {
      telegramUserId: parsed.user.id ?? null,
      username: parsed.user.username ?? null,
      hasHash: Boolean(parsed.hash),
    });
    return {
      telegramUser: parsed.user,
      startParam: parsed.startParam || null,
    };
  }

  throw new Error("Telegram init data is missing or invalid.");
}
