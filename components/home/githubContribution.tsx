"use client";

import { useTheme } from "next-themes";
import GitHubCalendar from "react-github-calendar";
import { github } from "../../data/contribution-graph-theme";
import { useState, useEffect } from "react";
import YearButton from "../ui/yearButton";
import { getGitHubYears } from "../../lib/utils";
import { siteConfig } from "@/data/data";

export default function GithubContributionGraph() {
  const [calendarYear, setCalendarYear] = useState<number | undefined>(
    undefined
  );
  const { theme, systemTheme } = useTheme();
  const [serverTheme, setServerTheme] = useState<"light" | "dark" | undefined>(
    undefined
  );
  const scheme =
    theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  useEffect(() => {
    setServerTheme(scheme);
  }, [scheme]);

  const today = new Date().getFullYear();
  const username = siteConfig.github;
  const joinYear = siteConfig.githubJoinYear;
  const years = getGitHubYears(joinYear);

  return (
    <div className="flex xl:flex-row flex-col gap-4">
      <div className="dark:bg-black border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-xs md:max-w-fit max-h-fit">
        <GitHubCalendar
          username={username}
          theme={github}
          colorScheme={serverTheme}
          blockSize={13}
          year={calendarYear}
        />
      </div>
      <div className="flex justify-start xl:flex-col flex-row flex-wrap gap-2">
        {years.slice(0, 5).map((year) => (
          <YearButton
            key={year}
            year={year}
            currentYear={calendarYear ?? today}
            onClick={() =>
              setCalendarYear(year === calendarYear ? undefined : year)
            }
          />
        ))}
      </div>
    </div>
  );
}
