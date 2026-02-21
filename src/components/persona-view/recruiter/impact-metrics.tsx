import { motion } from "framer-motion";

import achievements from "@/my-resume/achievements.json";

const impactList = achievements as Array<{
  id: number;
  icon: string;
  text: string;
}>;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export const ImpactMetrics = () => {
  if (impactList.length === 0) return null;

  return (
    <section className="mb-12" aria-label="Key impact highlights">
      <h2 className="font-serif text-2xl font-bold text-foreground">Impact</h2>
      <motion.div
        className="mt-4 flex flex-wrap gap-3"
        variants={container}
        initial="hidden"
        animate="show"
        role="list"
      >
        {impactList.map((a) => (
          <motion.div
            key={a.id}
            variants={item}
            className="rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-sm"
          >
            <span className="mr-2" aria-hidden>
              {a.icon}
            </span>
            <span className="text-muted-foreground">{a.text}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
