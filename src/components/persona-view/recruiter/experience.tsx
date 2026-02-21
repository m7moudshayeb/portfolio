import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import experience from "@/my-resume/experience.json";

export const Experience = () => {
  return (
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
  );
};
