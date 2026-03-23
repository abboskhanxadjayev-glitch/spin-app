import crypto from "node:crypto";

const DEFAULT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function getSecret(config) {
  return config.appTokenSecret || config.botToken || "spin-mini-app-demo-secret";
}

function signPayload(payload, config) {
  return crypto.createHmac("sha256", getSecret(config)).update(payload).digest("hex");
}

export function issueAppToken({ userId, telegramId }, config) {
  const issuedAt = Date.now();
  const payload = `${userId}.${telegramId}.${issuedAt}`;
  const signature = signPayload(payload, config);

  return Buffer.from(`${payload}.${signature}`, "utf8").toString("base64url");
}

export function verifyAppToken(token, config, options = {}) {
  if (!token) {
    return null;
  }

  const maxAgeMs = options.maxAgeMs ?? DEFAULT_MAX_AGE_MS;

  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split(".");
    if (parts.length !== 4) {
      return null;
    }

    const [userIdRaw, telegramId, issuedAtRaw, signature] = parts;
    const payload = `${userIdRaw}.${telegramId}.${issuedAtRaw}`;
    const expectedSignature = signPayload(payload, config);

    if (signature.length !== expectedSignature.length) {
      return null;
    }

    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature, "utf8"),
      Buffer.from(expectedSignature, "utf8")
    );

    if (!isValid) {
      return null;
    }

    const issuedAt = Number(issuedAtRaw);
    const userId = Number(userIdRaw);
    if (!Number.isFinite(issuedAt) || !Number.isFinite(userId)) {
      return null;
    }

    if (Date.now() - issuedAt > maxAgeMs) {
      return null;
    }

    return {
      userId,
      telegramId,
      issuedAt,
    };
  } catch (_error) {
    return null;
  }
}
