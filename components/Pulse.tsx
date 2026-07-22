import { FiArrowUpRight } from "react-icons/fi";
import { profile } from "@/data";
import {
  fetchContributionCalendar,
  type ContributionLevel,
} from "@/lib/github";
import Section from "./ui/Section";
import Reveal from "./ui/Reveal";

/** Opacity ramp for the accent colour, indexed by GitHub's 0–4 density level. */
const LEVEL_OPACITY: Record<ContributionLevel, string> = {
  0: "transparent",
  1: "0.28",
  2: "0.5",
  3: "0.72",
  4: "1",
};

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

const FULL_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

const githubProfileUrl = `https://github.com/${profile.githubUsername}`;

const Pulse = async () => {
  const calendar = await fetchContributionCalendar();

  return (
    <Section id="pulse" index="04" title="Pulse">
      <Reveal>
        <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
          Contribution activity over the last year, pulled live from my GitHub
          profile.
        </p>
      </Reveal>

      {calendar === null ? (
        <Reveal delay={0.08}>
          <p className="mt-8 font-mono text-xs text-muted-foreground">
            Activity is unavailable right now —{" "}
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              view it on GitHub
            </a>
            .
          </p>
        </Reveal>
      ) : (
        <>
          <Reveal delay={0.08}>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-border py-6 sm:grid-cols-4">
              {[
                {
                  label: "Contributions",
                  value: calendar.totalContributions.toLocaleString("en-US"),
                },
                { label: "Active days", value: String(calendar.activeDays) },
                {
                  label: "Longest streak",
                  value: `${calendar.longestStreak}d`,
                },
                {
                  label: "Busiest day",
                  value: String(calendar.busiestDayCount),
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 font-mono text-xl tabular-nums text-foreground">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.16}>
            {/* The calendar is wider than a phone; fade the right edge so it
                reads as scrollable rather than clipped. */}
            <div className="no-scrollbar mt-8 overflow-x-auto pb-2 mask-[linear-gradient(to_right,black_calc(100%-2rem),transparent)] sm:mask-none">
              <div
                className="flex gap-0.75"
                role="img"
                aria-label={`${calendar.totalContributions} GitHub contributions in the last year`}
              >
                {calendar.weeks.map((week, weekIndex) => {
                  const firstDay = week.find((day) => day !== null);
                  return (
                    <div
                      key={firstDay?.date ?? `week-${weekIndex}`}
                      className="flex flex-col gap-0.75"
                    >
                      {week.map((day, dayIndex) =>
                        day === null ? (
                          <div
                            key={`empty-${dayIndex}`}
                            className="h-2.5 w-2.5"
                          />
                        ) : (
                          <div
                            key={day.date}
                            title={`${day.count} contribution${
                              day.count === 1 ? "" : "s"
                            } on ${FULL_DATE_FORMATTER.format(
                              new Date(`${day.date}T00:00:00Z`)
                            )}`}
                            className="h-2.5 w-2.5 rounded-xs border border-border/40"
                            style={{
                              backgroundColor:
                                day.level === 0
                                  ? "transparent"
                                  : `hsl(var(--accent-link) / ${
                                      LEVEL_OPACITY[day.level]
                                    })`,
                            }}
                          />
                        )
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.65rem] text-muted-foreground">
              <span>
                {(() => {
                  const firstDay = calendar.weeks[0]?.find((d) => d !== null);
                  const lastWeek = calendar.weeks[calendar.weeks.length - 1];
                  const lastDay = [...(lastWeek ?? [])]
                    .reverse()
                    .find((d) => d !== null);

                  if (!firstDay || !lastDay) {
                    return null;
                  }

                  return `${MONTH_FORMATTER.format(
                    new Date(`${firstDay.date}T00:00:00Z`)
                  )} — ${MONTH_FORMATTER.format(
                    new Date(`${lastDay.date}T00:00:00Z`)
                  )}`;
                })()}
              </span>

              <span className="flex items-center gap-1.5">
                Less
                {([0, 1, 2, 3, 4] as const).map((level) => (
                  <span
                    key={level}
                    aria-hidden="true"
                    className="h-2.5 w-2.5 rounded-xs border border-border/40"
                    style={{
                      backgroundColor:
                        level === 0
                          ? "transparent"
                          : `hsl(var(--accent-link) / ${LEVEL_OPACITY[level]})`,
                    }}
                  />
                ))}
                More
              </span>
            </div>
          </Reveal>
        </>
      )}

      <Reveal delay={0.32}>
        <a
          href={githubProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-1.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-link"
        >
          View on GitHub
          <FiArrowUpRight
            aria-hidden="true"
            className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </Reveal>
    </Section>
  );
};

export default Pulse;
