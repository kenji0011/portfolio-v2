import { NextRequest, NextResponse } from "next/server";

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

function parseGitHubContributionsHtml(html: string): ContributionDay[] {
  // Map tooltip target id -> contribution count
  const countsById = new Map<string, number>();
  const tooltipRegex =
    /<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;

  let tipMatch: RegExpExecArray | null;
  while ((tipMatch = tooltipRegex.exec(html)) !== null) {
    const targetId = tipMatch[1];
    const text = tipMatch[2].trim();
    const numMatch = text.match(/^([\d,]+)\s+contribution/i);
    countsById.set(
      targetId,
      numMatch ? parseInt(numMatch[1].replace(/,/g, ""), 10) : 0
    );
  }

  // Extract each calendar day cell
  const days: ContributionDay[] = [];
  const tdRegex = /<td\b[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*>/g;

  let tdMatch: RegExpExecArray | null;
  while ((tdMatch = tdRegex.exec(html)) !== null) {
    const tag = tdMatch[0];
    const date = tdMatch[1];

    const idMatch = tag.match(/\bid="([^"]+)"/);
    const levelMatch = tag.match(/\bdata-level="([0-4])"/);

    const rawLevel = levelMatch ? parseInt(levelMatch[1], 10) : 0;
    const level = Math.min(4, Math.max(0, rawLevel)) as 0 | 1 | 2 | 3 | 4;
    const count = idMatch ? (countsById.get(idMatch[1]) ?? 0) : 0;

    days.push({ date, count, level });
  }

  // Sort chronologically (GitHub HTML renders row-by-row by weekday)
  days.sort((a, b) => a.date.localeCompare(b.date));
  return days;
}

async function fetchFromGitHub(username: string): Promise<ContributionDay[]> {
  const res = await fetch(
    `https://github.com/users/${encodeURIComponent(username)}/contributions`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PortfolioApp/1.0)",
        Accept: "text/html",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub returned ${res.status}`);
  }

  const html = await res.text();
  const contributions = parseGitHubContributionsHtml(html);

  if (contributions.length === 0) {
    throw new Error("No contribution cells parsed from GitHub HTML");
  }

  return contributions;
}

async function fetchFromFallbackApi(
  username: string
): Promise<ContributionDay[]> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
      username
    )}?y=last`,
    {
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Fallback API returned ${res.status}`);
  }

  const json = (await res.json()) as { contributions?: ContributionDay[] };
  if (!Array.isArray(json.contributions) || json.contributions.length === 0) {
    throw new Error("Fallback API returned empty contributions");
  }

  return json.contributions;
}

export async function GET(request: NextRequest) {
  const username =
    request.nextUrl.searchParams.get("username")?.trim() || "kenji0011";

  // Basic GitHub username validation
  if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    return NextResponse.json(
      { error: "Invalid GitHub username" },
      { status: 400 }
    );
  }

  try {
    let contributions: ContributionDay[];
    try {
      contributions = await fetchFromGitHub(username);
    } catch {
      contributions = await fetchFromFallbackApi(username);
    }

    const total = contributions.reduce((sum, day) => sum + day.count, 0);

    return NextResponse.json(
      { total, contributions },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : "Failed to fetch GitHub contributions";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
