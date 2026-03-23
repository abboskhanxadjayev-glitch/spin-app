function nowIso() {
  return new Date().toISOString();
}

function getUserDisplayName(row) {
  return row.first_name || row.username || `user_${row.telegram_id}`;
}

function normalizeUser(row) {
  return {
    id: row.id,
    telegramId: row.telegram_id,
    username: row.username || null,
    firstName: row.first_name || null,
    lastName: row.last_name || null,
    photoUrl: row.photo_url || null,
    displayName: getUserDisplayName(row),
    hearts: row.hearts ?? 0,
    isPremium: Boolean(row.is_premium),
    isVip: Boolean(row.is_premium),
    createdAt: row.created_at,
  };
}

function getUserRowByTelegramId(db, telegramId) {
  return db.prepare("SELECT * FROM users WHERE telegram_id = ?").get(String(telegramId));
}

function normalizeGift(row) {
  return {
    id: row.id,
    code: row.code,
    title: row.title,
    emoji: row.emoji,
    imageUrl: row.image_url || null,
    price: row.price,
    isActive: Boolean(row.is_active),
  };
}

export function upsertTelegramUser(db, telegramUser) {
  const now = nowIso();
  const username = telegramUser.username || null;
  const firstName = telegramUser.first_name || username || `user_${telegramUser.id}`;

  db.prepare(
    `
      INSERT INTO users (
        telegram_id,
        username,
        photo_url,
        first_name,
        last_name,
        language_code,
        is_premium,
        created_at,
        last_seen_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(telegram_id) DO UPDATE SET
        username = excluded.username,
        photo_url = excluded.photo_url,
        first_name = excluded.first_name,
        last_name = excluded.last_name,
        language_code = excluded.language_code,
        is_premium = excluded.is_premium,
        last_seen_at = excluded.last_seen_at
    `
  ).run(
    String(telegramUser.id),
    username,
    telegramUser.photo_url || null,
    firstName,
    telegramUser.last_name || null,
    telegramUser.language_code || null,
    telegramUser.is_premium ? 1 : 0,
    now,
    now
  );

  const userRow = getUserRowByTelegramId(db, telegramUser.id);
  return normalizeUser(userRow);
}

export function getUserById(db, userId) {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
  return row ? normalizeUser(row) : null;
}

export function getLaunchPayload(db, telegramUser) {
  return {
    user: upsertTelegramUser(db, telegramUser),
  };
}

export function addHeartsToUser(db, userId, amount) {
  const parsedAmount = Number(amount);
  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    throw new Error("Hearts amount must be greater than 0.");
  }

  db.prepare("UPDATE users SET hearts = hearts + ? WHERE id = ?").run(parsedAmount, userId);
  return getUserById(db, userId);
}

export function spendHearts(db, userId, amount) {
  const parsedAmount = Number(amount);
  const user = getUserById(db, userId);

  if (!user) {
    throw new Error("User not found.");
  }

  if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
    throw new Error("Hearts amount must be greater than 0.");
  }

  if (user.hearts < parsedAmount) {
    throw new Error("Not enough hearts.");
  }

  db.prepare("UPDATE users SET hearts = hearts - ? WHERE id = ?").run(parsedAmount, userId);
  return getUserById(db, userId);
}

export function spendHeartForSpin(db, userId) {
  return spendHearts(db, userId, 1);
}

export function spendHeartsForMediaPlayback(db, userId, mediaType, config) {
  const user = getUserById(db, userId);
  if (!user) {
    throw new Error("User not found.");
  }

  if (user.isVip) {
    return {
      user,
      chargedHearts: 0,
      isVip: true,
    };
  }

  const chargedHearts =
    mediaType === "video" ? config.mediaVideoHeartsCost : config.mediaAudioHeartsCost;
  const updatedUser = spendHearts(db, userId, chargedHearts);

  return {
    user: updatedUser,
    chargedHearts,
    isVip: false,
  };
}

export function addSpinHistory(db, userId, resultPayload) {
  db.prepare(
    `
      INSERT INTO spin_history (user_id, result, cost_hearts, created_at)
      VALUES (?, ?, 1, ?)
    `
  ).run(userId, JSON.stringify(resultPayload), nowIso());
}

export function getActiveGifts(db) {
  return db
    .prepare(
      `
        SELECT *
        FROM gifts
        WHERE is_active = 1
        ORDER BY price ASC, id ASC
      `
    )
    .all()
    .map(normalizeGift);
}

export function getGiftById(db, giftId) {
  const row = db.prepare("SELECT * FROM gifts WHERE id = ? AND is_active = 1").get(giftId);
  return row ? normalizeGift(row) : null;
}

export function sendGift(db, { fromUserId, toUserId, giftId }) {
  const sender = getUserById(db, fromUserId);
  if (!sender) {
    throw new Error("Sender not found.");
  }

  const target = getUserById(db, toUserId);
  if (!target) {
    throw new Error("Target user not found.");
  }

  if (sender.id === target.id) {
    throw new Error("You cannot send a gift to yourself.");
  }

  const gift = getGiftById(db, giftId);
  if (!gift) {
    throw new Error("Gift not found.");
  }

  if (sender.hearts < gift.price) {
    throw new Error("Not enough hearts.");
  }

  const runTransaction = db.transaction(() => {
    db.prepare("UPDATE users SET hearts = hearts - ? WHERE id = ?").run(gift.price, sender.id);
    const createdAt = nowIso();
    const result = db
      .prepare(
        `
          INSERT INTO gift_transactions (from_user_id, to_user_id, gift_id, price, created_at)
          VALUES (?, ?, ?, ?, ?)
        `
      )
      .run(sender.id, target.id, gift.id, gift.price, createdAt);

    return {
      id: result.lastInsertRowid,
      createdAt,
    };
  });

  const transaction = runTransaction();

  return {
    sender: getUserById(db, sender.id),
    target,
    gift,
    transaction: {
      id: transaction.id,
      price: gift.price,
      createdAt: transaction.createdAt,
    },
  };
}
