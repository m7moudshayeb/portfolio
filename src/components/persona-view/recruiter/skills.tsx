import { motion } from "framer-motion";

import skillsData from "@/my-resume/skills.json";

const skills = skillsData as Record<string, string[]>;
const categories = Object.entries(skills);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0 },
};

export const Skills = () => {
  return (
    <section className="mb-12">
      <h2 className="font-serif text-2xl font-bold text-foreground">
        Tech stack
      </h2>
      <motion.div
        className="mt-6 space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map(([category, techs]) => (
          <motion.div key={category} variants={item}>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {category}
            </h3>
            <ul className="flex flex-wrap gap-2" role="list">
              {techs.map((tech) => (
                <li key={tech}>
                  <span className="inline-flex rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
