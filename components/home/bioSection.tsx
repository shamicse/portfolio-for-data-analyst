import React from "react";
import Image from "next/image";
import { ubuntu, geistVF } from "@/app/fonts";
import WordRotate from "../ui/word-rotate";
import TypingAnimation from "../ui/typing-animation";
import { SocialIcons } from "../global/socialIcons";
import ShimmerButton from "../ui/shimmer-button";
import { Slide } from "../ui/slide";
import Link from "next/link";
import { siteConfig, socialLinks } from "@/data/data";
import { MusicCard } from "./musicCard";

export const BioSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-20 justify-items-center items-center">
      <div className="flex flex-col gap-4">
        <Slide delay={0.05}>
          <h1
            className={`${ubuntu.className} mt-4 text-4xl md:text-5xl h-32 md:h-28 font-bold`}
          >
            I&apos;m a{" "}
            <WordRotate
              className="font-bold"
              words={[
                "Data Analyst",
                " BI Analyst",
                " Business Analyst",
              ]}
            />
          </h1>
        </Slide>
        <Slide delay={0.1} className="mt-5 md:mt-9">
          <SocialIcons />
        </Slide>
        <div
          className={`${geistVF.className} dark:text-zinc-400 text-zinc-600 text-md md:text-lg leading-7`}
        >
          <Slide delay={0.1}>
            <p className="mt-2 mb-6">
              Aspiring Data Analyst with hands-on experience in Excel, SQL,
              Python, and Power BI for solving business problems through data.
              Skilled in data cleaning, transformation, dashboard development,
              KPI reporting, and storytelling with data.
            </p>
          </Slide>
          <Slide delay={0.2}>
            <p className="mt-2 mb-6">
              Pursuing B.Tech in Computer Science Engineering at JECRC
              University, Jaipur. Certified in Microsoft Power BI, IBM
              SkillsBuild, and Cisco Data Analyst programs.
            </p>
          </Slide>
          <Slide delay={0.25}>
            <p className="mt-2 mb-6 dark:text-zinc-100 text-zinc-800">
              Open to internships, freelance projects, and collaborations —
              reach out via{" "}
              <Link
                href={`mailto:${siteConfig.email}`}
                className="underline underline-offset-4 text-blue-600"
              >
                email
              </Link>{" "}
              or any of my{" "}
              <Link
                href={socialLinks.linkedin}
                className="underline underline-offset-4 text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                social links
              </Link>
            </p>
          </Slide>
        </div>
      </div>
      <div className="flex flex-col gap-8 items-center md:mt-28 w-full">
        <Slide delay={0.05}>
          <Image
            src="/profile.png"
            className="rounded-full w-44 md:w-72 object-cover aspect-square"
            width={350}
            height={350}
            alt="Profile Photo"
            priority
          />
        </Slide>
        <Slide
          delay={0.1}
          className={`${ubuntu.className} text-2xl font-bold tracking-widest`}
        >
          <TypingAnimation className="tracking-wider text-2xl md:text-4xl">
            Shami Akhtar
          </TypingAnimation>
        </Slide>
        <Slide delay={0.2} className="w-full flex justify-center">
          <div className="w-full max-w-[480px]">
            <MusicCard />
          </div>
        </Slide>
      </div>
    </section>
  );
};
