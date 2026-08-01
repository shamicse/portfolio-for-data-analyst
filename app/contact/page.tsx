"use client";

import { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { Slide } from "@/components/ui/slide";
import { Button } from "@/components/ui/button";
import { siteConfig, socialLinks } from "@/data/data";
import Link from "next/link";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${body}`;
    window.location.href = mailto;
    setStatus("success");
  };

  return (
    <div className="w-10/12 h-full mx-auto flex flex-col items-center mt-2 xl:ml-48 pb-16">
      <Slide delay={0.1} className="w-full">
        <Heading className="text-left w-full mt-16" text="Contact Me" />
      </Slide>

      <Slide delay={0.2} className="w-full max-w-2xl mt-8">
        <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
          Have a project in mind, an internship opportunity, or just want to
          connect? Fill out the form below or reach me directly at{" "}
          <Link
            href={`mailto:${siteConfig.email}`}
            className="text-blue-600 underline underline-offset-4"
          >
            {siteConfig.email}
          </Link>
          . Based in {siteConfig.location}.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-white dark:bg-zinc-900/40 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="flex flex-col gap-2 text-sm font-medium">
              Name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Your name"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Email
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
                placeholder="you@email.com"
              />
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Subject
            <input
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
              placeholder="What's this about?"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Message
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500 resize-none"
              placeholder="Tell me about your project or opportunity..."
            />
          </label>
          <Button type="submit" className="w-full md:w-fit px-8 py-3">
            Send Message
          </Button>
          {status === "success" && (
            <p className="text-green-600 dark:text-green-400 text-sm">
              Opening your email client — send the message to complete contact.
            </p>
          )}
        </form>
      </Slide>

      <Slide delay={0.3} className="w-full max-w-2xl mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "GitHub", href: socialLinks.github },
            { label: "LinkedIn", href: socialLinks.linkedin },
            { label: "Email", href: `mailto:${siteConfig.email}` },
            { label: "Spotify", href: socialLinks.spotify },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={item.label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:border-blue-500/50 transition-colors text-center font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Slide>
    </div>
  );
}
