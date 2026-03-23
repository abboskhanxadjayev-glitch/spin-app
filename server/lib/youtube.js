const YOUTUBE_SEARCH_ENDPOINT = "https://www.googleapis.com/youtube/v3/search";

export async function searchYouTubeVideos({ apiKey, query, maxResults = 8 }) {
  const trimmedQuery = String(query || "").trim();
  if (!trimmedQuery) {
    throw new Error("Search query is required.");
  }

  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY is not configured.");
  }

  const url = new URL(YOUTUBE_SEARCH_ENDPOINT);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", String(Math.min(Math.max(Number(maxResults) || 8, 1), 10)));
  url.searchParams.set("q", trimmedQuery);
  url.searchParams.set("key", apiKey);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const apiMessage =
      data?.error?.message || response.statusText || "YouTube API request failed.";
    throw new Error(`YouTube search failed: ${apiMessage}`);
  }

  return (data.items ?? []).map((item) => ({
    videoId: item.id?.videoId ?? null,
    title: item.snippet?.title ?? "Untitled video",
    channelTitle: item.snippet?.channelTitle ?? "Unknown channel",
    thumbnail:
      item.snippet?.thumbnails?.medium?.url ??
      item.snippet?.thumbnails?.default?.url ??
      null,
  })).filter((item) => item.videoId);
}
