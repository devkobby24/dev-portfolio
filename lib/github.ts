import { profile } from "@/data";

/** GitHub's own scale: 0 is empty, 4 is the densest day. */
export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

/** A calendar column. Leading/trailing padding days are null so the grid aligns to weekdays. */
export type ContributionWeek = (ContributionDay | null)[];

export type ContributionCalendar = {
  weeks: ContributionWeek[];
  totalContributions: number;
  activeDays: number;
  longestStreak: number;
  busiestDayCount: number;
};

const CONTRIBUTIONS_ENDPOINT = `https://github-contributions-api.jogruber.de/v4/${profile.githubUsername}?y=last`;
const DAYS_PER_WEEK = 7;
const REVALIDATE_SECONDS = 60 * 60 * 12;

const isContributionLevel = (value: unknown): value is ContributionLevel =>
  value === 0 || value === 1 || value === 2 || value === 3 || value === 4;

const parseDay = (raw: unknown): ContributionDay => {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Contribution day is not an object");
  }

  const { date, count, level } = raw as Record<string, unknown>;

  if (typeof date !== "string" || typeof count !== "number") {
    throw new Error("Contribution day is missing a valid date or count");
  }
  if (!isContributionLevel(level)) {
    throw new Error(`Contribution day has an unexpected level: ${String(level)}`);
  }

  return { date, count, level };
};

/**
 * Groups days into calendar columns, padding the first and last weeks so every
 * column holds seven slots and rows line up with days of the week.
 */
const buildWeeks = (days: ContributionDay[]): ContributionWeek[] => {
  if (days.length === 0) {
    return [];
  }

  const leadingPadding = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const slots: (ContributionDay | null)[] = [
    ...Array<null>(leadingPadding).fill(null),
    ...days,
  ];

  while (slots.length % DAYS_PER_WEEK !== 0) {
    slots.push(null);
  }

  return Array.from({ length: slots.length / DAYS_PER_WEEK }, (_, weekIndex) =>
    slots.slice(weekIndex * DAYS_PER_WEEK, (weekIndex + 1) * DAYS_PER_WEEK)
  );
};

const countLongestStreak = (days: ContributionDay[]): number => {
  let longest = 0;
  let running = 0;

  for (const day of days) {
    running = day.count > 0 ? running + 1 : 0;
    longest = Math.max(longest, running);
  }

  return longest;
};

const findBusiestDayCount = (days: ContributionDay[]): number =>
  days.reduce((busiest, day) => Math.max(busiest, day.count), 0);

/**
 * Fetches the last year of public contribution activity.
 *
 * Returns null when the upstream service is unreachable or errors: this is a
 * third-party outage, not a bug in this site, and it must not fail the build or
 * blank the page. Malformed data still throws, because that means the response
 * shape changed and the code needs updating.
 */
export const fetchContributionCalendar =
  async (): Promise<ContributionCalendar | null> => {
    let response: Response;

    try {
      response = await fetch(CONTRIBUTIONS_ENDPOINT, {
        next: { revalidate: REVALIDATE_SECONDS },
      });
    } catch {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const payload: unknown = await response.json();

    if (typeof payload !== "object" || payload === null) {
      throw new Error("Contributions response was not an object");
    }

    const { contributions } = payload as Record<string, unknown>;

    if (!Array.isArray(contributions)) {
      throw new Error("Contributions response is missing a contributions array");
    }

    const days = contributions.map(parseDay);

    return {
      weeks: buildWeeks(days),
      totalContributions: days.reduce((total, day) => total + day.count, 0),
      activeDays: days.filter((day) => day.count > 0).length,
      longestStreak: countLongestStreak(days),
      busiestDayCount: findBusiestDayCount(days),
    };
  };
