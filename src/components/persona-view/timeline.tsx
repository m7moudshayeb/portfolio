import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadCV } from "@/components/download-cv";
import summary from "@/my-resume/summary.json";
import achievements from "@/my-resume/achievements.json";
import experience from "@/my-resume/experience.json";

export const TimelineView = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <h1 className="font-serif text-4xl font-bold text-foreground">
          {(summary as { name: string }).name}
        </h1>
        <p className="mt-1 text-xl text-primary">
          {(summary as { title: string }).title}
        </p>
        <p className="mt-2 text-muted-foreground">
          {(summary as { tagline: string }).tagline}
        </p>
        <p className="mt-6">
          <a
            href="/contact"
            className="text-primary underline underline-offset-4 hover:no-underline"
          >
            Contact me
          </a>
          {" · "}
          <a
            href="/calendly"
            className="text-primary underline underline-offset-4 hover:no-underline"
          >
            Book a call
          </a>
          {" · "}
          <DownloadCV />
        </p>
      </motion.section>

      <section className="mb-12">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Experience
        </h2>
        <ul className="mt-4 space-y-6">
          {(
            experience as Array<{
              title: string;
              company: string;
              date: string;
              description: string[];
            }>
          ).map((exp, i) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{exp.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {exp.company} · {exp.date}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {exp.description.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Key achievements
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {(achievements as Array<{ icon: string; text: string }>).map(
            (a, i) => (
              <motion.div
                key={a.text}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Card>
                  <CardContent className="flex items-start gap-3 pt-6">
                    <span className="text-2xl">{a.icon}</span>
                    <p className="text-sm text-muted-foreground">{a.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ),
          )}
        </div>
      </section>

      {/* You implement: tech stack section (Epic 1.2), impact metrics (Epic 1.4). */}
    </div>
  );
};
