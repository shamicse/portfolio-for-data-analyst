import Image from "next/image";
import { Heading } from "@/components/ui/heading";
import { Slide } from "@/components/ui/slide";
import ShimmerButton from "@/components/ui/shimmer-button";
import { siteConfig, socialLinks } from "@/data/data";
import Link from "next/link";

export default function AboutMePage() {
  return (
    <div className="w-10/12 h-full mx-auto flex flex-col items-center mt-2 xl:ml-48 pb-16">
      <Slide delay={0.1} className="w-full">
        <Heading className="text-left w-full mt-16" text="About Me" />
      </Slide>

      <div className="w-full max-w-3xl mt-10 flex flex-col md:flex-row gap-10 items-start">
        <Slide delay={0.15}>
          <Image
            src="/profile.png"
            alt="Shami Akhtar"
            width={280}
            height={280}
            className="rounded-2xl object-cover aspect-square shadow-lg"
          />
        </Slide>

        <Slide delay={0.2} className="flex-1 flex flex-col gap-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Shami Akhtar</h2>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              Data Analyst · {siteConfig.location}
            </p>
          </div>

          <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
            <p>
              I&apos;m an aspiring Data Analyst passionate about turning raw
              data into stories that drive decisions. My journey started with
              curiosity about numbers and patterns, and grew into building
              dashboards, running SQL queries, and writing Python scripts that
              uncover real business insights.
            </p>
            <p>
              Currently pursuing my B.Tech in Computer Science at JECRC
              University, Jaipur, I combine academic foundations with hands-on
              project work across road safety analytics, HR attrition, customer
              trends, and financial risk dashboards.
            </p>
            <p>
              I&apos;m certified in Microsoft Power BI, IBM SkillsBuild, and
              Cisco Data Analytics — and I&apos;m always exploring new datasets,
              better visualizations, and smarter ways to communicate findings.
            </p>
            <p>
              When I&apos;m not analyzing data, you&apos;ll find me on{" "}
              <Link
                href={socialLinks.spotify}
                target="_blank"
                className="text-[#1DB954] underline underline-offset-4"
              >
                Spotify
              </Link>{" "}
              curating playlists, contributing to open-source learning repos on
              GitHub, or sharpening my skills in Generative AI tools.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              "SQL",
              "Python",
              "Power BI",
              "Excel",
              "Pandas",
              "Data Storytelling",
              "Generative AI",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
              >
                {skill}
              </span>
            ))}
          </div>

          <ShimmerButton
            href={siteConfig.resumePath}
            className="shadow-xl px-8 py-3 w-fit"
            borderRadius="10px"
          >
            <span className="text-sm font-medium text-white lg:text-base">
              Download Resume
            </span>
          </ShimmerButton>
        </Slide>
      </div>

      <Slide delay={0.3} className="w-full max-w-3xl mt-16">
        <h3 className="text-xl font-bold mb-4">What I&apos;m Looking For</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Internships",
              desc: "Data analyst or BI roles where I can learn from real teams and datasets.",
            },
            {
              title: "Freelance Projects",
              desc: "Dashboard builds, Excel automation, SQL reporting, and ad-hoc analysis.",
            },
            {
              title: "Collaborations",
              desc: "Open to hackathons, Kaggle teams, and portfolio-worthy data projects.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-900/40"
            >
              <h4 className="font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Slide>
    </div>
  );
}
