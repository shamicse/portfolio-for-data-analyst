"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ubuntu, geistVF } from "@/app/fonts";
import { Heading } from "../ui/heading";
import { Slide } from "../ui/slide";

interface Experience {
  company: string;
  date: string;
  role: string;
  description: string[];
  technologies: string[];
}

const experiencesData: Experience[] = [
  {
    company: "JECRC University",
    date: "2022 – 2026",
    role: "B.Tech Computer Science Engineering",
    description: [
      "Pursuing Bachelor of Technology in Computer Science Engineering with focus on data analytics and business intelligence.",
      "Building practical skills in Python, SQL, Excel, and Power BI through academic projects and self-driven analysis work.",
      "Applying data storytelling, dashboard development, and KPI reporting to real-world datasets across multiple domains.",
    ],
    technologies: ["Python", "SQL", "Power BI", "Excel", "Data Analysis"],
  },
  {
    company: "Microsoft Learn",
    date: "2025",
    role: "Microsoft Power BI Certification",
    description: [
      "Completed Microsoft Power BI certification covering data modeling, DAX, Power Query, and dashboard design.",
      "Gained expertise in building interactive reports and transforming raw data into actionable business insights.",
    ],
    technologies: ["Power BI", "DAX", "Power Query", "Data Modeling"],
  },
  {
    company: "IBM SkillsBuild",
    date: "2025",
    role: "Data Analytics Certificate",
    description: [
      "Completed IBM SkillsBuild data analytics program covering data cleaning, visualization, and analytical workflows.",
      "Strengthened foundations in exploratory data analysis and business reporting with industry-standard tools.",
    ],
    technologies: ["Python", "SQL", "Excel", "Data Visualization"],
  },
  {
    company: "Cisco",
    date: "2025",
    role: "Data Analyst Certificate",
    description: [
      "Earned Cisco Data Analyst certification validating skills in data interpretation, reporting, and analytical thinking.",
      "Applied structured problem-solving approaches to translate data into meaningful business recommendations.",
    ],
    technologies: ["SQL", "Excel", "Analytics", "Reporting"],
  },
];

export const WorkExperience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 80%"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="w-full flex flex-col justify-start mt-10 md:mt-16">
      <Slide delay={0.1} className="w-full">
        <Heading
          className="text-left w-full mt-16 mb-8"
          text="Education & Certifications"
        />
      </Slide>

      <div ref={containerRef} className="relative pl-12 md:pl-20 mt-4">
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[3px] bg-zinc-200 dark:bg-zinc-800/50 rounded-full">
          <motion.div
            style={{ height }}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-600 blur-[6px] opacity-70"
          />
          <motion.div
            style={{ height }}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full"
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center z-20">
              <motion.div
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                className="absolute w-6 h-6 rounded-full bg-purple-500"
              />
              <motion.div
                animate={{ scale: [1, 1.8], opacity: [0.8, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.2,
                }}
                className="absolute w-4 h-4 rounded-full bg-blue-400"
              />
              <div className="relative w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(168,85,247,0.8)]" />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-8 md:gap-12">
          {experiencesData.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ExperienceCard = ({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, {
    margin: "-30% 0px -30% 0px",
    amount: "some",
  });

  return (
    <Slide delay={0.1 * index} className="relative group">
      <div ref={cardRef}>
        <div
          data-active={isInView}
          className="absolute -left-10 md:-left-[52.9px] top-6 w-3 h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-zinc-950 z-10 transition-all duration-500 group-hover:bg-cyan-400 group-hover:scale-150 group-hover:border-cyan-200 dark:group-hover:border-cyan-900 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.6)] data-[active=true]:bg-cyan-400 data-[active=true]:scale-150 data-[active=true]:border-cyan-200 dark:data-[active=true]:border-cyan-900 data-[active=true]:shadow-[0_0_15px_rgba(34,211,238,0.6)]"
        />
        <div className="bg-white dark:bg-zinc-900/40 p-5 md:p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:shadow-lg hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden backdrop-blur-sm">
          <div
            className="flex flex-col md:flex-row md:items-start justify-between gap-4 cursor-pointer relative z-10"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex gap-4 items-start">
              <div className="relative shrink-0 w-12 h-12 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
                <span className="text-xl font-bold text-zinc-400">
                  {experience.company[0]}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3
                    className={`${ubuntu.className} text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-500 transition-colors`}
                  >
                    {experience.company}
                  </h3>
                  <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">
                  {experience.role}
                </p>
              </div>
            </div>
            <span
              className={`${geistVF.className} shrink-0 text-xs font-medium text-zinc-600 dark:text-zinc-300 whitespace-nowrap bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700`}
            >
              {experience.date}
            </span>
          </div>

          <motion.div
            initial={false}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden relative z-10"
          >
            <div
              className={`${geistVF.className} text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed flex flex-col gap-3 pt-4 pb-2 border-t border-zinc-100 dark:border-zinc-800/50 mt-4`}
            >
              {experience.description.map((line, i) => (
                <p key={i} className="flex gap-3 items-start">
                  <span className="text-blue-400 dark:text-blue-500 mt-1 text-[10px]">
                    ✦
                  </span>
                  <span>{line}</span>
                </p>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2 relative z-10 mt-4">
            {experience.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-[11px] font-medium rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};
